import { cloneDeep, get } from 'lodash';

export class Query {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    filter() {
        const clonedQuery = cloneDeep(this.queryString);
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete clonedQuery[el]);
        let queryStr = JSON.stringify(clonedQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagenate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    sort() {
        if(get(this.queryString, 'sort', '')) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if(get(this.queryString, 'fields', '')) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }
}