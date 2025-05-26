export interface IDiaries {
    date: string;
    id: number;
    visibility:Visibility;
    weather: Weather;


}

export enum Visibility {
    Poor = "poor",
    Good = "good",
    Default = " "

}

export enum Weather {
    Cloudy = "cloudy",
    Windy = "windy",
    Sunny = "sunny",
    Rainy = "rainy",
    Default = ""
}


interface AddNewDiary extends IDiaries {
    comment: string
}


export type NewDiary = Omit<AddNewDiary, "id">