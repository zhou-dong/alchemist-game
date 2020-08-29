import { Styles } from "./TreeButton";

export const DISABLED: Styles = {
    rect: {
        fill: "#fff",
        stroke: "lightgray",
        fillOpacity: 0,
    },
    text: {
        fill: "rgba(0, 0, 0, 0.26)",
        fontSize: "13"
    }
};

export const ENABLED: Styles = {
    rect: {
        fill: "#fff",
        stroke: "rgba(25, 118, 210, 0.5)",
        fillOpacity: 0,
    },
    text: {
        fill: "#1976d2",
        fontSize: "13"
    }
};
