module.exports = {
    "components": {
        "schemas": {
            "ThongTinNguoiDung": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                    },
                    "pass_word": {
                        "type": "string",
                    },
                    "username": {
                        "type": "string",
                    },
                    "birth_day": {
                        "type": "string",
                    },
                    "phone": {
                        "type": "string",
                    },
                    "gender": {
                        "type": "string",
                    },
                    "role": {
                        "type": "string",
                    }
                }
            },
            "DangNhapView": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                    },
                    "pass_word": {
                        "type": "string"
                    }
                }
            },
            "BinhLuanViewModel": {
                "properties": {
                    "ma_nguoi_binh_luan": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "ngay_binh_luan": {
                        "type": "string",
                    },
                    "noi_dung": {
                        "type": "string",
                    },
                    "sao_binh_luan": {
                        "type": "integer",
                        "format": "int32"
                    },
                }
            },
            "NguoiDungViewModel": {
                "properties": {
                    "username": {
                        "type": "string",
                    },
                    "email": {
                        "type": "string",
                    },
                    "pass_word": {
                        "type": "string",
                    },
                    "phone": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "birth_day": {
                        "type": "string",
                    },
                    "gender": {
                        "type": "string",
                    },
                    "role": {
                        "type": "string",
                    },
                }
            },
            "updateUser": {
                "properties": {
                    "username": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "phone": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "birth_day": {
                        "type": "string"
                    },
                    "gender": {
                        "type": "string"
                    },
                    "role": {
                        "type": "string"
                    }
                }
            },
        },
    }
};