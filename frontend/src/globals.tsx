export default class globals {
  static backendServer: string =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api`
      : `http://localhost:8000/api`;
}
