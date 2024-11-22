import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./lng/en.json";
import sp from "./lng/sp.json";
import fr from "./lng/fr.json";
import it from "./lng/it.json";
import uk from "./lng/uk.json";
import ru from "./lng/ru.json";

i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		sp: {
			translation: sp,
		},
		fr: {
			translation: fr,
		},
		it: {
			translation: it,
		},
		ua: {
			translation: uk,
		},
		ru: {
			translation: ru,
		},
	},
	 lng: localStorage.getItem("lng") || "en",


});

export default i18next;