import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { AccountView } from "../views/account-view";

export class AccountBuilder extends AbstractBuilder<Data.UserProfile, AccountView>{
    compose(m: Data.UserProfile, v: AccountView) {
        v.id = m.id;
        v.firstName = m.firstName;
        v.lastName = m.lastName;
        v.phoneNumber = m.phone;
        v.role = "Operator"
        v.dateOfBirth = v.dateOfBirth;
        v.address = m.address;
        v.email = m.email;
        v.gender= "male"
    }
    decompose(v: AccountView): Data.UserProfile {
        return{
            id : v.id,
            firstName:v.firstName,
            lastName : v.lastName,
            email : v.email,
            phone: v.phoneNumber,
            role:v.role,
            address:v.address    
        }
      
    }
    view(): AccountView {
        return new AccountView();
    }

}

