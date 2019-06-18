/// <reference types="node" />
export declare function new_dom_element(params?: {
    nodeName?: any;
    style?: {
        [key: string]: any;
    };
    onclick?: Function;
    innerHTML?: any;
    src?: any;
    parentNode?: any;
    className?: any;
    txt?: any;
    onmousedown?: Function;
    id?: any;
    ondrop?: any;
}, nodeName?: string): any;
export declare class new_alert_msg {
    private header;
    private popup;
    private title;
    private params;
    private title_close;
    private rotatating;
    private deg;
    private in_rotation;
    private background;
    private content;
    private img;
    private msg;
    private footer;
    constructor(params1?: {});
    create_header(): any;
    create_content(): any;
    _loop_spinner_(): false | NodeJS.Timeout;
    create_footer(): any;
    hide_btn(): string;
    show_btn(): string;
    hide(): boolean;
    show(): false | NodeJS.Timeout;
    setMsg(msg: any): any;
}
