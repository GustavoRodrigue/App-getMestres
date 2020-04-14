export interface IMenu{
    group: string;
    itens: Array<IMenuItem>;
}

export interface IMenuItem {
    label: string;
    url: string;
    icon: string;
}