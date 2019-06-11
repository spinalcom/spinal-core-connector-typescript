import { Model } from "../../Models/Model";

export class UserRight extends Model{
  constructor(){
    super();
  }

  // @ts-ignore
  set(){
    console.log("Set a UserRight is not allowed.")
  }
}