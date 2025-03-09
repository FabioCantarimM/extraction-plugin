interface DattosColumn {
    id: number;
    originColumn: "A" | "B";
    name: string;
    dataType: "Text" | "Float";
    marginType: number; // Aqui seria melhor passar uma string caso queria mais verbosidade no objeto
    marginValue: number;
}

interface DattosCondition {
    id: number;
    type: "key" | "value";
    operatotor: "Equals";
    columns: DattosColumn[]
    isOptional?: boolean;
}

interface DattosRule {
    id: number;
    name: string;
    order: number;
    cardinality: "OneToOne" | "OneToMany" | "ManyToMany";
    compareTarget: "SameSideColumns" | "SideASideBRelationships"
    conditions: DattosCondition[];
}

interface DattosPayload {
    sideATableName: string;
    sideBTableName: string;
    sideAMatchingTableName: string;
    sideBMatchingTableName: string;
    matchingDivergenceTableName: string;
    analysisMatchingRules: DattosRule[];
}



const payload = {
    "SideATableName": "dev.redrex.lado_a_razao",
    "SideBTableName": "dev.redrex.lado_b_financeiro",
    "SideAMatchingTableName": "dev.redrex.caso1_lado_a_razao_matching",
    "SideBMatchingTableName": "dev.redrex.caso1_lado_b_financeiro_matching",
    "MatchingDivergenceTableName": "dev.redrex.caso1_matching_divergence",
    "AnalysisMatchingRules": [
        {
            "Id": 78,
            "Name": "Regra 1",
            "Order": 1,
            "RelationshipType": "SideASideA",
            "Cardinality": "OneToOne",
            "SameSideColumns": [
                {
                    "Id": 1,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "Column": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "Column": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        },
        {
            "Id": 94,
            "Name": "Regra 2",
            "Order": 2,
            "RelationshipType": "SideBSideB",
            "Cardinality": "OneToOne",
            "SameSideColumns": [
                {
                    "Id": 1,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "Column": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "Column": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        },
        {
            "Id": 95,
            "Name": "Regra 3",
            "Order": 3,
            "RelationshipType": "SideASideB",
            "Cardinality": "OneToOne",
            "SideASideBRelationships": [
                {
                    "Id": 2,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 1,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    },
                    "ColumnB": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        },
        {
            "Id": 96,
            "Name": "Regra 4",
            "Order": 4,
            "RelationshipType": "SideASideB",
            "Cardinality": "ManyToMany",
            "SideASideBRelationships": [
                {
                    "Id": 2,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 1,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": true,
                    "ColumnA": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    },
                    "ColumnB": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        },
        {
            "Id": 97,
            "Name": "Regra 5",
            "Order": 5,
            "RelationshipType": "SideASideB",
            "Cardinality": "ManyToMany",
            "SideASideBRelationships": [
                {
                    "Id": 1,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 1,
                        "Name": "Chave Referência",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    },
                    "ColumnB": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        },
        {
            "Id": 98,
            "Name": "Regra 6",
            "Order": 6,
            "RelationshipType": "SideASideB",
            "Cardinality": "OneToOne",
            "SideASideBRelationships": [
                {
                    "Id": 2,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 3,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 4,
                        "Name": "Nº doc.",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 5,
                        "Name": "NumDocRef",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 1,
                    "MarginValue": 1,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    },
                    "ColumnB": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        },
        {
            "Id": 99,
            "Name": "Regra 7",
            "Order": 7,
            "RelationshipType": "SideASideB",
            "Cardinality": "ManyToMany",
            "SideASideBRelationships": [
                {
                    "Id": 2,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 3,
                        "Name": "Conta Contábil",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 3,
                    "Type": "Key",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 4,
                        "Name": "Nº doc.",
                        "DataType": "Text"
                    },
                    "ColumnB": {
                        "Id": 5,
                        "Name": "NumDocRef",
                        "DataType": "Text"
                    }
                },
                {
                    "Id": 4,
                    "Type": "Value",
                    "Operator": "Equals",
                    "Margin": 0,
                    "MarginValue": 0,
                    "IsOptional": false,
                    "ColumnA": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    },
                    "ColumnB": {
                        "Id": 2,
                        "Name": "Valor BRL",
                        "DataType": "Float"
                    }
                }
            ]
        }
    ]
}
