import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DeepDiffService {
  deepDiff(
    obj1: any,
    obj2: any,
    path = ""
  ): { [key: string]: { oldValue: any; newValue: any } } {
    let changes = { id: obj2.id };

    for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && !key.startsWith("_")) {
        const fullPath = path ? `${path}.${key}` : key;
        if (!obj2.hasOwnProperty(key)) {
          changes[fullPath] = { oldValue: obj1[key], newValue: undefined };
        } else if (typeof obj1[key] === "object" && obj1[key] !== null) {
          const nestedChanges = this.deepDiff(obj1[key], obj2[key], fullPath);
          changes = { ...changes, ...nestedChanges };
        } else if (obj1[key] !== obj2[key]) {
          changes[fullPath] = { oldValue: obj1[key], newValue: obj2[key] };
        }
      }
    }

    for (let key in obj2) {
      if (
        obj2.hasOwnProperty(key) &&
        !obj1.hasOwnProperty(key) &&
        !key.startsWith("_")
      ) {
        const fullPath = path ? `${path}.${key}` : key;
        changes[fullPath] = { oldValue: undefined, newValue: obj2[key] };
      }
    }

    return changes;
  }
}
