var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const counterSchema = new Schema(
    {
        _id: { type: String, required: true },
        seq: { type: Number, default: 0 }
    }
);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const counterModel = mongoose.model('counter', counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
    counterModel.findByIdAndUpdate(
        modelName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    )
    .then(counter => {
        if (!counter) {
            // If counter doesn't exist, create a new one
            const newCounter = new counterModel({ _id: modelName, seq: 1 });
            return newCounter.save();
        }
        doc.id = counter.seq;
        next();
    })
    .catch(error => {
        next(error);
    });
};


module.exports = autoIncrementModelID;