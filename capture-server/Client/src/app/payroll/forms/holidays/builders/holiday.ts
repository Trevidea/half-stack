import { Collection } from "src/app/blocks/collection";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { HolidayModel } from "src/app/model-service/holiday-model";
import { Data } from "src/app/model-service/payroll-interface";
import { HolidaysViews } from "../views/holidays";

export class HolidayBuilder implements AbstractBuilder<Data.Holiday, HolidaysViews>
{
    compose(m: Data.Holiday, v: HolidaysViews) {
        v.name = m.name
        v.dateOfHoliday = m.dt_holiday
        v.categories.SelectedItem = m.category
        v.year = m.year
        v.id = m.id
    }
    decompose(v: HolidaysViews): Data.Holiday {
        return {
            name: v.name,
            dt_holiday: v.dateOfHoliday,
            category: v.categories.SelectedItem,
            year: v.year,
            id: v.id
        }
    }
    view(): HolidaysViews {
        return new HolidaysViews();
    }

}

export class CategoriesBuilder extends AbstractBuilder<Data.MetaType, Collection<string>>
{
    compose(m: Data.MetaType, v: Collection<string>) {
        m.values.forEach((item: string) => v.Add(item));
    }
    decompose(v: Collection<string>): Data.MetaType {
        throw new Error("Method not implemented.");
    }
    view(): Collection<string> {
        return new Collection<string>();
    }

}