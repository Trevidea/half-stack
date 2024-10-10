// import { Data } from "src/app/services/models-interfaces/full-stack-interface";
// import { AbstractBuilder } from "src/app/blocks/strategies";
// import { ContactView } from "../views/contects";

// export class ContectBuilder extends AbstractBuilder<Data.Contact, ContactView> {
//     override compose(m: Data.Contact, v: ContactView) {
//         v.contactEmail = m.email;
//         v.contactName = m.contact_name;
//         v.contactPhone = m.phone;
//     }

//     override decompose(v: ContactView): Data.Contact {
//         return {
//             contact_name: v.contactName,
//             phone: v.contactPhone,
//             email: v.contactEmail
//         }
//     }
//     override view(): ContactView {
//         return new ContactView();
//     }

// }