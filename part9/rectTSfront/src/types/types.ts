export interface IDiaries {
    date: string;
    id: number;
    visibility:Visibility;
    weather: Weather;


}

export enum Visibility {
    Poor = "poor",
    Good = "good",

}

export enum Weather {
    Cloudy = "cloudy",
    Windy = "windy",
    Sunny = "sunny",
    Rainy = "rainy"
}

