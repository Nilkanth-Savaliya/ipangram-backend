const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose_delete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);
let Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default: null,
    },
    last_name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    dob: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    hobbies: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    employee_id: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
  .plugin(mongoosePaginate)
  .plugin(mongoose_delete, { overrideMethods: "all" })
  .plugin(AutoIncrement, { inc_field: "employee_id" });

const User = mongoose.model("User", userSchema);

module.exports = { User };
