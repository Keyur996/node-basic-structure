import { cloneDeep, get } from 'lodash';

export class Query {

    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString
    }

    filter() {
        const clonedQuery = cloneDeep(this.queryString);
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete clonedQuery[el]);
    
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(clonedQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
        this.model = this.model.find(JSON.parse(queryStr));
        return this;
    }

    pagenate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.model = this.model.skip(skip).limit(limit);
        return this;
    }

    sort() {
        if(get(this.queryString, 'sort', '')) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.model = this.model.sort();
        } else {
            this.model = this.model.sort('-createdAt');
        }

        return this;
    }
}