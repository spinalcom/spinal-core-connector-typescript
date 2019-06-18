import { ModelProcessManager } from "../ModelProcessManager";
import { Model } from "..";

export class Process {

  public process_id : number;
  public models: Model[] = [];
  
  
  constructor(model: Model | Model[] , onChangeConstruction: boolean = true){
    this.process_id  = ModelProcessManager._cur_process_id++;
    if (model instanceof  Model){
      model.bind( this, onChangeConstruction);
    } 
    else if (model.hasOwnProperty('length')  ){
      for (let i = 0; i < model.length; i++) {
        model[i].bind(this, onChangeConstruction)
      }
    }
    else {
      console.error("Process constructor doesn't know what to do with", model)
    }
  }
  
  destructor(){
    for (let m  of  this.models)  {
      let index = m._processes.indexOf(this);
      if (index >= 0 ){
        m._processes.splice(index, 1);
      }
    }
  }

  onChange(){}
}