"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
let TagRepository = class TagRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(tag_entity_1.Tag, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    findTagsByName(names) {
        return this.find({
            where: {
                name: (0, typeorm_1.In)(names),
            },
        });
    }
};
TagRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TagRepository);
exports.TagRepository = TagRepository;
//# sourceMappingURL=tag.repository.js.map