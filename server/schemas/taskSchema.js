const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String, required: true},
    isChecked: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    assigned: { type: String, default: null, required:true },
    created: { type: Date, default: Date.now },


}
);

module.exports = mongoose.model("Tasks", taskSchema);