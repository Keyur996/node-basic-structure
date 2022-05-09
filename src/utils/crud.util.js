import { CustomError } from './customError.util';

export const createOne = Model => async (req, res) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    })
}

export const updateOne = Model => async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!doc) {
        throw new CustomError('No Document Found With this ID', 404);
    }

    res.status(201).json({
        status: 'success',
        data: doc
    })
}

export const deleteOne = Model => async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) {
        return new CustomError('No Document Found With this ID', 404);
    }

    res.status(200).json({
        status: 'success',
        data: null
    })
}

export const getOne = (Model, popOptions) => async (req, res) => {
    // const query = Model.find
} 