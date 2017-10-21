export interface IAssociation {
	oneToOne?: Array<IAssociationOption>;
	oneToMany?: Array<IAssociationOption>;
    manyToMany?: Array<IAssociationOption>;
}

export interface IAssociationOption {
    model: string;
    as: string;
    foreignKey?: string;
    sourceKey?: string;
    targetKey?: string;
    through?: string;
    source?: boolean;
}
