export declare class SpinalUserManager {
    static get_user_id(options: any, user_name: any, password: any, success_callback: any, error_callback?: any): any;
    static get_admin_id(options: any, admin_name: any, password: any, success_callback: any, error_callback?: any): any;
    static new_account(options: any, user_name: any, password: any, success_callback: any, error_callback?: any): any;
    static change_password(options: any, user_id: any, password: any, new_password: any, success_callback: any, error_callback?: any): any;
    static delete_account(options: any, user_id: any, password: any, success_callback: any, error_callback?: any): any;
    static change_password_by_admin(options: any, username: any, password: any, admin_id: any, admin_password: any, success_callback: any, error_callback?: any): any;
    static delete_account_by_admin(options: any, username: any, admin_id: any, admin_password: any, success_callback: any, error_callback?: any): any;
    static change_account_rights_by_admin(options: any, username: any, right: any, admin_id: any, admin_password: any, success_callback: any, error_callback?: any): any;
    static send_xhr(options: any, get_cmd: any, success_callback: any, error_callback: any): any;
    static _if_error(error_callback: any, fun: any, response: any): any;
}
