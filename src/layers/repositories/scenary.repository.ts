import { Scenary } from "../../types/documents";
import { Repository } from "./Repository";

export class ScenaryRepository extends Repository<Scenary> {
    constructor() {
        super("scenarys")
    }
}