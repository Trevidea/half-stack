export interface CoreMenuItem {
    id: string;
    title: string;
    url?: string;
    type: 'section' | 'collapsible' | 'item';
    role?: Array<string>;
    translate?: string;
    icon?: string;
    disabled?: boolean;
    hidden?: boolean;
    classes?: string;
    exactMatch?: boolean;
    externalUrl?: boolean;
    openInNewTab?: boolean;
    ShowGroup?:boolean;
    group?: string;
    groupName?:string;
    badge?: {
        title?: string;
        translate?: string;
        classes?: string;
    };
    children?: CoreMenuItem[];
    entity?: string
}
export interface CoreMenu extends CoreMenuItem {
    children?: CoreMenuItem[];
}
export const menu: CoreMenu[] = [
    //Business Records

    {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'MENU.PAYROLL.DASHBOARD',
        type: 'item',
        icon: 'home',
        // url: 'entity/testsets/testsets'
        url: 'dashboard/page-not-found'

    },
    {
        id: 'master',
        title: 'MASTER',
        translate: 'MENU.PAYROLL.MASTER',
        type: 'item',
        ShowGroup:true,
    },
    {                 // If role is not assigned will be display to all users
        id: 'employees-master',
        title: 'Employee Master',
        translate: 'MENU.PAYROLL.EMPLOYEES',
        type: 'collapsible',
        icon: 'users',
        // url: 'entity/components/components'
        children: [
            {
                // If role is not assigned will be display to all users
                id: 'employees',
                title: 'Employee',
                translate: 'MENU.PAYROLL.EMPLOYEES',
                type: 'item',
                // icon: 'supervisor_account',
                url: 'employees'
            },
            {                // If role is not assigned will be display to all
                id: 'leave',
                title: 'Leave',
                translate: 'MENU.PAYROLL.LEAVE',
                type: 'item',
                // icon: 'graphic_eq',
                // url: 'entity/contacts/contacts'
                url: 'leaves'
            },
        ]
    },
    {
        // If role is not assigned will be display to all
        id: 'holidays',
        title: 'Holiday',
        translate: 'MENU.PAYROLL.HOLIDAYS',
        type: 'item',
        icon: 'coffee',
        // url: 'entity/contracts/contracts'
        url: 'holidays'
    },
    {
        id: 'transaction',
        title: 'TRANSACTION',
        translate: 'MENU.PAYROLL.TRANSACTION',
        type: 'item',
        ShowGroup:true,
    },
    {
        // If role is not assigned will be display to all
        id: 'attendances',
        title: 'Attendance',
        translate: 'MENU.PAYROLL.ATTENDANCE',
        type: 'item',
        icon: 'user-check',
        // url: 'entity/customers/customers'
        url: 'attendances'
    },
    {               
        id: 'sick-leave',
        title: 'Sick Leave',
        translate: 'MENU.PAYROLL.SICKLEAVE',
        type: 'item',
        icon: 'frown',
        // url: 'entity/contacts/contacts'
        url: 'sick-leaves'
    },
    {
        // If role is not assigned will be display to all
        id: 'payroll',
        title: 'Payroll',
        translate: 'MENU.PAYROLL.PAYROLL',
        type: 'item',
        icon: 'dollar-sign',
        // url: 'entity/contacts/contacts'
        url: 'payroll'
    },
    {
        // If role is not assigned will be display to all
        id: 'privilege',
        title: 'Privilege',
        translate: 'MENU.PAYROLL.PRIVILEGE',
        type: 'item',
        icon: 'award',
        // url: 'entity/contacts/contacts'
        url: 'privilege'
    },
    {
        // If role is not assigned will be display to all
        id: 'monthly-attendance',
        title: 'Monthly Attendance',
        translate: 'MENU.PAYROLL.MONTHLYATTENDANCE',
        type: 'item',
        icon: 'calendar',
        // url: 'entity/accounts/accounts'
        url: 'monthly-attendances'
    },

    {
        // If role is not assigned will be display to all
        id: 'salary-rate',
        title: 'Salary Rate',
        translate: 'MENU.PAYROLL.PAYROLLEMPLOYEE',
        type: 'item',
        icon: 'file-text',
        url: 'salary-rates'
        // url: 'payroll-employee'
    },
    // {
    //     // If role is not assigned will be display to all
    //     id: 'payroll-attendance',
    //     title: 'Payroll Attendance',
    //     translate: 'MENU.PAYROLL.PAYROLLATTENDANCE',
    //     type: 'item',
    //     icon: 'work',
    //     // url: 'entity/accounts/accounts'
    //     url: 'payroll-attendance'
    // },
    // {
    //     // If role is not assigned will be display to all
    //     id: 'payroll-calculated',
    //     title: 'Payroll Calculate',
    //     translate: 'MENU.PAYROLL.PAYROLLCALCULATED',
    //     type: 'item',
    //     icon: 'calendar_today',
    //     // url: 'entity/contacts/contacts'
    //     url: 'payroll-calculated'
    // },
    {
        // If role is not assigned will be display to all
        id: 'monthly-salary',
        title: 'Monthly Salary',
        translate: 'MENU.PAYROLL.MonthlySalary',
        type: 'item',
        icon: 'calendar',
        // url: 'entity/contacts/contacts'
        url: 'monthly-salaries'
    },
    {
        id: 'Preferences',
        title: 'Preferences',
        translate: 'MENU.PAYROLL.PREFERENCES',
        type: 'item',
        ShowGroup:true,
    },

    {
        // If role is not assigned will be display to all
        id: 'setting',
        title: 'Setting',
        translate: 'MENU.PAYROLL.SETTING',
        type: 'collapsible',
        icon: 'settings',
        // url: 'entity/contacts/contacts'
        children: [
            {
                // If role is not assigned will be display to all
                id: 'configuration',
                title: 'Configuration',
                translate: 'MENU.PAYROLL.CONFIGURATION',
                type: 'item',
                // icon: 'graphic_eq',
                // url: 'entity/contacts/contacts'
                url: 'configuration'
            },
            {
                // If role is not assigned will be display to all
                id: 'salary-slip',
                title: 'Salary Slips Field',
                translate: 'MENU.PAYROLL.SALARYSLIP',
                type: 'item',
                // icon: 'list_alt',
                url: 'salary-slip'
            },
            {
                id: 'meta-type',
                title: 'Meta-Types',
                translate: 'MENU.PAYROLL.METATYPE',
                type: 'item',
                // icon: 'item',
                // url: 'entity/testsets/testsets'
                url: 'meta-type/:id'

            },
            
        ]


    },

    {
        id: 'help-Center',
        title: 'Help & Center',
        translate: 'MENU.PAYROLL.HELP-CENTER',
        type: 'item',
         icon: 'help-circle',
        // url: 'entity/testsets/testsets'
        url: 'page-not-found/not'

    }

    // {Help & Center
    //     // If role is not assigned will be display to all
    //     id: 'salary-slip',
    //     title: 'Salary Slips',
    //     translate: 'MENU.PAYROLL.SALARYSLIP',
    //     type: 'item',
    //     icon: 'list_alt',
    //     // url: 'entity/contacts/contacts'
    //     url: 'salary-slip'
    // },

    // {
    //     id: 'meta-type',
    //     title: 'Meta-Types',
    //     translate: 'MENU.PAYROLL.METATYPE',
    //     type: 'item',
    //     icon: 'item',
    //     // url: 'entity/testsets/testsets'
    //     url: 'meta-type/:id'

    // }

]