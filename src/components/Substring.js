export default function Substring(text, limit, perWords = false) {
    if (perWords) {
        let w = text.split(" ");
        let toReturn = "";
        for (let i = 0; i < limit; i++) {
            if (w[i] !== undefined) {
                toReturn += w[i];
            }
            if (i < limit - 1) {
                toReturn += " ";
            }
        }

        if (limit < w.length) {
            toReturn += "...";
        }
        return toReturn;
    } else {
        let toReturn = text.substring(0, limit);
        if (text.split(toReturn)[1] !== "") {
            toReturn += "...";
        }
        return toReturn;
    }
}