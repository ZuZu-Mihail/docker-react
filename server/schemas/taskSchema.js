const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String, required: true},
    isChecked: { type: Boolean, default: false }
}
);

module.exports = mongoose.model("Tasks", taskSchema);