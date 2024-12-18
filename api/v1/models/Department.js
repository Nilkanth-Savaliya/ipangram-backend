const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose_delete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);
let Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    department_name: {
      type: String,
      default: null,
    },
    category_name: {
      type: String,
      enum: ["HR", "IT", "sales", "product", "marketing"],
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    salary: {
      type: Number,
      default: null,
    },
    employee_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
  .plugin(mongoosePaginate)
  .plugin(mongoose_delete, { overrideMethods: "all" })

const Department = mongoose.model("Department", departmentSchema);

module.exports = { Department };
