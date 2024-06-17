import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { AccountView } from "../views/account-view";

export class AccountBuilder extends AbstractBuilder<Data.LoggedInUser, AccountView> {
    compose(m: Data.LoggedInUser, v: AccountView) {
        v.id = m.id;
        v.userName = m.username
        v.firstName = m.firstName;
        v.lastName = m.lastName;
        v.phoneNumber = m.phoneNumber;
        v.role = m.role;
        v.address = m.address;
        v.email = m.email;
    }

    decompose(v: AccountView): Data.LoggedInUser {
        return {
            id: v.id,
            username: v.userName,
            firstName: v.firstName,
            lastName: v.lastName,
            email: v.email,
            phoneNumber: v.phoneNumber,
            role: v.role,
            address: v.address
        }
    }
    view(): AccountView {
        return new AccountView();
    }

}

