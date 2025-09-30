export const MAIN_PAGE = `${process.env.SERVICE}/`;
export const VACANCY_PARAMS = `${process.env.SERVICE_SEARCH_PARAMS}`;
export const VACANCIES_PAGE = `${process.env.SERVICE}/search/vacancy?text=${encodeURI(VACANCY_PARAMS)}&area=1&hhtmFrom=main&hhtmFromLabel=vacancy_search_line`;
