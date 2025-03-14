// /server/index.js
import * as http from "node:http";
import * as url from "node:url";

const storeJSON = {
    "jugadores": [
        {
            "id": "4giaqu7",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 82,
            "equipoId": "h6uxalb"
        },
        {
            "id": "24l69o5",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 60,
            "equipoId": "h6uxalb"
        },
        {
            "id": "hlx3l1u",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 73,
            "equipoId": "h6uxalb"
        },
        {
            "id": "px6nt4g",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 85,
            "equipoId": "h6uxalb"
        },
        {
            "id": "6l8wfdk",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 65,
            "equipoId": "h6uxalb"
        },
        {
            "id": "2hu5hp6",
            "nombre": "Roberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 92,
            "equipoId": "h6uxalb"
        },
        {
            "id": "r14r22z",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 164,
            "peso": 63,
            "equipoId": "h6uxalb"
        },
        {
            "id": "orsehwd",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 60,
            "equipoId": "h6uxalb"
        },
        {
            "id": "9f93o3u",
            "nombre": "Ignacio",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 79,
            "equipoId": "h6uxalb"
        },
        {
            "id": "lo09y1i",
            "nombre": "Federico",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 77,
            "equipoId": "h6uxalb"
        },
        {
            "id": "npwq6mj",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 98,
            "equipoId": "h6uxalb"
        },
        {
            "id": "8zpilgx",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 97,
            "equipoId": "h6uxalb"
        },
        {
            "id": "bvdbqvj",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 192,
            "peso": 73,
            "equipoId": "h6uxalb"
        },
        {
            "id": "enper6g",
            "nombre": "Juan",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 94,
            "equipoId": "h6uxalb"
        },
        {
            "id": "fz6wql5",
            "nombre": "Esteban",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 72,
            "equipoId": "h6uxalb"
        },
        {
            "id": "w7dtxww",
            "nombre": "Pedro",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 182,
            "peso": 80,
            "equipoId": "h6uxalb"
        },
        {
            "id": "ntw0gzo",
            "nombre": "Roberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 87,
            "equipoId": "h6uxalb"
        },
        {
            "id": "w2eh4co",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 62,
            "equipoId": "h6uxalb"
        },
        {
            "id": "7j84q66",
            "nombre": "Juan",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 62,
            "equipoId": "h6uxalb"
        },
        {
            "id": "9yguvou",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 85,
            "equipoId": "h6uxalb"
        },
        {
            "id": "ttfpxov",
            "nombre": "Carlos",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 194,
            "peso": 69,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "da430h9",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 199,
            "peso": 62,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "jk9ojj5",
            "nombre": "Javier",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 75,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "ux54x1l",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 170,
            "peso": 85,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "upcq4mt",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 174,
            "peso": 96,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "i9l7v3w",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 83,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "aowrwrw",
            "nombre": "Roberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 165,
            "peso": 96,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "wi0tojb",
            "nombre": "Daniel",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 179,
            "peso": 85,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "c08bjm6",
            "nombre": "Federico",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 77,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "jusg14s",
            "nombre": "Ignacio",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 86,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "ndr9szu",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 66,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "bhgq4nq",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 62,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "qe28hdx",
            "nombre": "Ignacio",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 170,
            "peso": 65,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "tfgzsy5",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 84,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "iq6rbqj",
            "nombre": "Daniel",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 64,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "m4k0ihx",
            "nombre": "Ignacio",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 80,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "dggmlbj",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 168,
            "peso": 71,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "8phpi1r",
            "nombre": "Ignacio",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 77,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "w47vkjb",
            "nombre": "Luis",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 94,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "nc5o1dr",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 94,
            "equipoId": "rsc0jp5"
        },
        {
            "id": "i8wzui9",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 84,
            "equipoId": "kakmwyu"
        },
        {
            "id": "le5y85u",
            "nombre": "Esteban",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 164,
            "peso": 64,
            "equipoId": "kakmwyu"
        },
        {
            "id": "oaccsdk",
            "nombre": "Luis",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 73,
            "equipoId": "kakmwyu"
        },
        {
            "id": "tj6a8ng",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 74,
            "equipoId": "kakmwyu"
        },
        {
            "id": "j79tl92",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 90,
            "equipoId": "kakmwyu"
        },
        {
            "id": "fqoc3gh",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 199,
            "peso": 75,
            "equipoId": "kakmwyu"
        },
        {
            "id": "6nd8u1v",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 94,
            "equipoId": "kakmwyu"
        },
        {
            "id": "azzufge",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 81,
            "equipoId": "kakmwyu"
        },
        {
            "id": "1d77gug",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 160,
            "peso": 74,
            "equipoId": "kakmwyu"
        },
        {
            "id": "roy2dqz",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 70,
            "equipoId": "kakmwyu"
        },
        {
            "id": "e1bzaxo",
            "nombre": "Alberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 80,
            "equipoId": "kakmwyu"
        },
        {
            "id": "iefgwjm",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 63,
            "equipoId": "kakmwyu"
        },
        {
            "id": "zkk0jjb",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 67,
            "equipoId": "kakmwyu"
        },
        {
            "id": "ebylgdv",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 88,
            "equipoId": "kakmwyu"
        },
        {
            "id": "gsebdkv",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 84,
            "equipoId": "kakmwyu"
        },
        {
            "id": "x1z9su8",
            "nombre": "Federico",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 61,
            "equipoId": "kakmwyu"
        },
        {
            "id": "htqp25d",
            "nombre": "Alberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 87,
            "equipoId": "kakmwyu"
        },
        {
            "id": "xqg9kgq",
            "nombre": "Juan",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 87,
            "equipoId": "kakmwyu"
        },
        {
            "id": "nl2ar1z",
            "nombre": "Pedro",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 69,
            "equipoId": "kakmwyu"
        },
        {
            "id": "6pc89hs",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 160,
            "peso": 83,
            "equipoId": "kakmwyu"
        },
        {
            "id": "eh3l3x5",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 75,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "wuesz53",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 65,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "aci1vgc",
            "nombre": "Luis",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 81,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "xxx11wg",
            "nombre": "Luis",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 60,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "ttyufah",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 91,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "m7vqlob",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 84,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "sfhtm4d",
            "nombre": "Daniel",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 73,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "ngdmxli",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 76,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "51kjhnt",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 174,
            "peso": 76,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "rsylpzg",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 174,
            "peso": 95,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "g8wfrae",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 195,
            "peso": 99,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "5vb12tq",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 95,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "6whyqjd",
            "nombre": "Pedro",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 94,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "z09ltnj",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 78,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "wjxu4gf",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 74,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "a3c961f",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 89,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "vwut3vy",
            "nombre": "Daniel",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 80,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "vslw3rq",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 92,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "ph472rn",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 86,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "ql7phre",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 84,
            "equipoId": "gfzhmn0"
        },
        {
            "id": "sb6e6z0",
            "nombre": "Carlos",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 62,
            "equipoId": "42qvjtj"
        },
        {
            "id": "186655n",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 90,
            "equipoId": "42qvjtj"
        },
        {
            "id": "xob1lkt",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 95,
            "equipoId": "42qvjtj"
        },
        {
            "id": "bh5xzes",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 76,
            "equipoId": "42qvjtj"
        },
        {
            "id": "e2ur7ck",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 95,
            "equipoId": "42qvjtj"
        },
        {
            "id": "t26t3zz",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 65,
            "equipoId": "42qvjtj"
        },
        {
            "id": "iqyou8h",
            "nombre": "Luis",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 64,
            "equipoId": "42qvjtj"
        },
        {
            "id": "bih28wc",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 62,
            "equipoId": "42qvjtj"
        },
        {
            "id": "suzmbof",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 177,
            "peso": 77,
            "equipoId": "42qvjtj"
        },
        {
            "id": "ns1883q",
            "nombre": "Javier",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 80,
            "equipoId": "42qvjtj"
        },
        {
            "id": "ogmy5ug",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 97,
            "equipoId": "42qvjtj"
        },
        {
            "id": "et3tvp0",
            "nombre": "Daniel",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 182,
            "peso": 92,
            "equipoId": "42qvjtj"
        },
        {
            "id": "no5q0ao",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 92,
            "equipoId": "42qvjtj"
        },
        {
            "id": "uzgsy75",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 65,
            "equipoId": "42qvjtj"
        },
        {
            "id": "26wcl1f",
            "nombre": "Alberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 100,
            "equipoId": "42qvjtj"
        },
        {
            "id": "wtv0hqy",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 93,
            "equipoId": "42qvjtj"
        },
        {
            "id": "i5p1ks7",
            "nombre": "Roberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 192,
            "peso": 99,
            "equipoId": "42qvjtj"
        },
        {
            "id": "1g9tuk0",
            "nombre": "Alberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 94,
            "equipoId": "42qvjtj"
        },
        {
            "id": "709954b",
            "nombre": "Federico",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 90,
            "equipoId": "42qvjtj"
        },
        {
            "id": "4dr9frk",
            "nombre": "Daniel",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 67,
            "equipoId": "42qvjtj"
        },
        {
            "id": "temmexj",
            "nombre": "Pedro",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 87,
            "equipoId": "gyezttf"
        },
        {
            "id": "3vasgbu",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 75,
            "equipoId": "gyezttf"
        },
        {
            "id": "ardhcyz",
            "nombre": "Daniel",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 84,
            "equipoId": "gyezttf"
        },
        {
            "id": "4frrwkk",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 177,
            "peso": 100,
            "equipoId": "gyezttf"
        },
        {
            "id": "5uj2opv",
            "nombre": "Juan",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 94,
            "equipoId": "gyezttf"
        },
        {
            "id": "n1iwmdl",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 170,
            "peso": 78,
            "equipoId": "gyezttf"
        },
        {
            "id": "z6eq3v6",
            "nombre": "Pedro",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 80,
            "equipoId": "gyezttf"
        },
        {
            "id": "8v89bo3",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 88,
            "equipoId": "gyezttf"
        },
        {
            "id": "bkhoept",
            "nombre": "Juan",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 63,
            "equipoId": "gyezttf"
        },
        {
            "id": "v51d2m9",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 78,
            "equipoId": "gyezttf"
        },
        {
            "id": "ca5o4fb",
            "nombre": "Javier",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 194,
            "peso": 70,
            "equipoId": "gyezttf"
        },
        {
            "id": "ln5iidg",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 74,
            "equipoId": "gyezttf"
        },
        {
            "id": "db39oo6",
            "nombre": "Carlos",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 81,
            "equipoId": "gyezttf"
        },
        {
            "id": "jsu0fra",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 97,
            "equipoId": "gyezttf"
        },
        {
            "id": "q5oju9x",
            "nombre": "Daniel",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 73,
            "equipoId": "gyezttf"
        },
        {
            "id": "mad5xv5",
            "nombre": "Juan",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 194,
            "peso": 65,
            "equipoId": "gyezttf"
        },
        {
            "id": "x3a660w",
            "nombre": "Alberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 192,
            "peso": 95,
            "equipoId": "gyezttf"
        },
        {
            "id": "6npt1ob",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 165,
            "peso": 89,
            "equipoId": "gyezttf"
        },
        {
            "id": "ij4me2k",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 99,
            "equipoId": "gyezttf"
        },
        {
            "id": "z7ce90x",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 96,
            "equipoId": "gyezttf"
        },
        {
            "id": "c0piucj",
            "nombre": "Alberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 72,
            "equipoId": "o4p4hei"
        },
        {
            "id": "raoz8g8",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 91,
            "equipoId": "o4p4hei"
        },
        {
            "id": "rvzc87e",
            "nombre": "Ignacio",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 68,
            "equipoId": "o4p4hei"
        },
        {
            "id": "e6kyf2i",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 95,
            "equipoId": "o4p4hei"
        },
        {
            "id": "wnuwz74",
            "nombre": "Esteban",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 70,
            "equipoId": "o4p4hei"
        },
        {
            "id": "fin1i5w",
            "nombre": "Federico",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 90,
            "equipoId": "o4p4hei"
        },
        {
            "id": "lqwudhz",
            "nombre": "Ignacio",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 168,
            "peso": 73,
            "equipoId": "o4p4hei"
        },
        {
            "id": "zz6cpsw",
            "nombre": "Pedro",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 77,
            "equipoId": "o4p4hei"
        },
        {
            "id": "xbome15",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 71,
            "equipoId": "o4p4hei"
        },
        {
            "id": "fdrzben",
            "nombre": "Federico",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 86,
            "equipoId": "o4p4hei"
        },
        {
            "id": "014idp1",
            "nombre": "Alberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 83,
            "equipoId": "o4p4hei"
        },
        {
            "id": "ddolnbp",
            "nombre": "Carlos",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 68,
            "equipoId": "o4p4hei"
        },
        {
            "id": "ze7v2aa",
            "nombre": "Luis",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 64,
            "equipoId": "o4p4hei"
        },
        {
            "id": "8yyuzzq",
            "nombre": "Roberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 82,
            "equipoId": "o4p4hei"
        },
        {
            "id": "glygi78",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 90,
            "equipoId": "o4p4hei"
        },
        {
            "id": "e3mgwbv",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 86,
            "equipoId": "o4p4hei"
        },
        {
            "id": "1oaiaen",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 76,
            "equipoId": "o4p4hei"
        },
        {
            "id": "nchkny9",
            "nombre": "Luis",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 163,
            "peso": 86,
            "equipoId": "o4p4hei"
        },
        {
            "id": "y0kmg53",
            "nombre": "Daniel",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 94,
            "equipoId": "o4p4hei"
        },
        {
            "id": "3128szt",
            "nombre": "Daniel",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 86,
            "equipoId": "o4p4hei"
        },
        {
            "id": "ug45rck",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 182,
            "peso": 73,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "h9n5ljx",
            "nombre": "Carlos",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 164,
            "peso": 70,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "mq1zkni",
            "nombre": "Luis",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 63,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "keo8gfs",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 90,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "f9ylmy7",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 179,
            "peso": 97,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "147yib6",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 66,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "tpcangq",
            "nombre": "Pedro",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 174,
            "peso": 85,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "2xgtj5z",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 73,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "d7u4xks",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 79,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "m00w9fa",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 79,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "bvsv5cr",
            "nombre": "Daniel",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 89,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "842hq1h",
            "nombre": "Ignacio",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 186,
            "peso": 83,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "29b731j",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 79,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "hdh6bkr",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 68,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "9qxvh21",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 170,
            "peso": 78,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "sx9e19s",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 100,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "8hid05u",
            "nombre": "Alberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 99,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "px1x30n",
            "nombre": "Carlos",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 85,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "ouezhq0",
            "nombre": "Roberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 92,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "3aihb48",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 90,
            "equipoId": "2t4zb9n"
        },
        {
            "id": "loes1hn",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 69,
            "equipoId": "btcv159"
        },
        {
            "id": "9l7wzew",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 90,
            "equipoId": "btcv159"
        },
        {
            "id": "vp9yg54",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 63,
            "equipoId": "btcv159"
        },
        {
            "id": "qrps5uf",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 86,
            "equipoId": "btcv159"
        },
        {
            "id": "mxwun02",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 179,
            "peso": 99,
            "equipoId": "btcv159"
        },
        {
            "id": "sd7z06d",
            "nombre": "Esteban",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 73,
            "equipoId": "btcv159"
        },
        {
            "id": "k21dn8j",
            "nombre": "Ignacio",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 170,
            "peso": 83,
            "equipoId": "btcv159"
        },
        {
            "id": "g443pys",
            "nombre": "Federico",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 78,
            "equipoId": "btcv159"
        },
        {
            "id": "yh0a1xx",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 98,
            "equipoId": "btcv159"
        },
        {
            "id": "76dkiqu",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 84,
            "equipoId": "btcv159"
        },
        {
            "id": "d1g089v",
            "nombre": "Ignacio",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 186,
            "peso": 100,
            "equipoId": "btcv159"
        },
        {
            "id": "exfktgm",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 179,
            "peso": 96,
            "equipoId": "btcv159"
        },
        {
            "id": "vkrnjiw",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 85,
            "equipoId": "btcv159"
        },
        {
            "id": "ldbb4gv",
            "nombre": "Juan",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 61,
            "equipoId": "btcv159"
        },
        {
            "id": "37rbki2",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 80,
            "equipoId": "btcv159"
        },
        {
            "id": "3hex7pg",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 88,
            "equipoId": "btcv159"
        },
        {
            "id": "m23kvdd",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 85,
            "equipoId": "btcv159"
        },
        {
            "id": "sjla12j",
            "nombre": "Juan",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 199,
            "peso": 99,
            "equipoId": "btcv159"
        },
        {
            "id": "17ced2r",
            "nombre": "Alberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 164,
            "peso": 81,
            "equipoId": "btcv159"
        },
        {
            "id": "a3vqgnn",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 199,
            "peso": 71,
            "equipoId": "btcv159"
        },
        {
            "id": "x615gy2",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 63,
            "equipoId": "1j3jq70"
        },
        {
            "id": "afdu8gb",
            "nombre": "Carlos",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 182,
            "peso": 88,
            "equipoId": "1j3jq70"
        },
        {
            "id": "579gjvd",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 87,
            "equipoId": "1j3jq70"
        },
        {
            "id": "gmi6pks",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 91,
            "equipoId": "1j3jq70"
        },
        {
            "id": "r1u5vpy",
            "nombre": "Esteban",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 79,
            "equipoId": "1j3jq70"
        },
        {
            "id": "f1nbxbh",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 62,
            "equipoId": "1j3jq70"
        },
        {
            "id": "z6oa8fm",
            "nombre": "Ignacio",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 182,
            "peso": 83,
            "equipoId": "1j3jq70"
        },
        {
            "id": "rv8t8so",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 164,
            "peso": 77,
            "equipoId": "1j3jq70"
        },
        {
            "id": "qyjg0v8",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 76,
            "equipoId": "1j3jq70"
        },
        {
            "id": "p0hx2wd",
            "nombre": "Luis",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 84,
            "equipoId": "1j3jq70"
        },
        {
            "id": "duy66vs",
            "nombre": "Daniel",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 85,
            "equipoId": "1j3jq70"
        },
        {
            "id": "v8o9oqm",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 179,
            "peso": 85,
            "equipoId": "1j3jq70"
        },
        {
            "id": "rq3f60m",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 82,
            "equipoId": "1j3jq70"
        },
        {
            "id": "6hc8n55",
            "nombre": "Luis",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 81,
            "equipoId": "1j3jq70"
        },
        {
            "id": "75k2il7",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 98,
            "equipoId": "1j3jq70"
        },
        {
            "id": "3a3nxr8",
            "nombre": "Javier",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 190,
            "peso": 71,
            "equipoId": "1j3jq70"
        },
        {
            "id": "y0tudh2",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 160,
            "peso": 81,
            "equipoId": "1j3jq70"
        },
        {
            "id": "phuy3mg",
            "nombre": "Esteban",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 160,
            "peso": 93,
            "equipoId": "1j3jq70"
        },
        {
            "id": "2lxsnzy",
            "nombre": "Federico",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 195,
            "peso": 72,
            "equipoId": "1j3jq70"
        },
        {
            "id": "fj761tx",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 80,
            "equipoId": "1j3jq70"
        },
        {
            "id": "829bnu8",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 66,
            "equipoId": "svwshyb"
        },
        {
            "id": "mafc0a4",
            "nombre": "Roberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 65,
            "equipoId": "svwshyb"
        },
        {
            "id": "s6jvs9v",
            "nombre": "Juan",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 188,
            "peso": 61,
            "equipoId": "svwshyb"
        },
        {
            "id": "3vhr0yx",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 93,
            "equipoId": "svwshyb"
        },
        {
            "id": "jn3owdf",
            "nombre": "Javier",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 76,
            "equipoId": "svwshyb"
        },
        {
            "id": "i2yo7xi",
            "nombre": "Juan",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 88,
            "equipoId": "svwshyb"
        },
        {
            "id": "uxl8ffg",
            "nombre": "Pedro",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 86,
            "equipoId": "svwshyb"
        },
        {
            "id": "gx6p57q",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 195,
            "peso": 65,
            "equipoId": "svwshyb"
        },
        {
            "id": "6nd61z6",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 92,
            "equipoId": "svwshyb"
        },
        {
            "id": "34fg9ay",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 82,
            "equipoId": "svwshyb"
        },
        {
            "id": "ar0ihn3",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 85,
            "equipoId": "svwshyb"
        },
        {
            "id": "86xa3fh",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 160,
            "peso": 65,
            "equipoId": "svwshyb"
        },
        {
            "id": "odbpx8k",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 86,
            "equipoId": "svwshyb"
        },
        {
            "id": "b1g7gd1",
            "nombre": "Pedro",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 62,
            "equipoId": "svwshyb"
        },
        {
            "id": "jzkzxdf",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 87,
            "equipoId": "svwshyb"
        },
        {
            "id": "yw51dpk",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 198,
            "peso": 97,
            "equipoId": "svwshyb"
        },
        {
            "id": "piw23vj",
            "nombre": "Luis",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 88,
            "equipoId": "svwshyb"
        },
        {
            "id": "mg5ob4f",
            "nombre": "Juan",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 183,
            "peso": 81,
            "equipoId": "svwshyb"
        },
        {
            "id": "80yiltb",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 196,
            "peso": 83,
            "equipoId": "svwshyb"
        },
        {
            "id": "unnuznu",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 163,
            "peso": 97,
            "equipoId": "svwshyb"
        },
        {
            "id": "olxpudx",
            "nombre": "Luis",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 195,
            "peso": 69,
            "equipoId": "c33k9x2"
        },
        {
            "id": "jgqdd66",
            "nombre": "Juan",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 72,
            "equipoId": "c33k9x2"
        },
        {
            "id": "rkp7td3",
            "nombre": "Luis",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 182,
            "peso": 92,
            "equipoId": "c33k9x2"
        },
        {
            "id": "eikphmu",
            "nombre": "Daniel",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 62,
            "equipoId": "c33k9x2"
        },
        {
            "id": "x87keqe",
            "nombre": "Alberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 83,
            "equipoId": "c33k9x2"
        },
        {
            "id": "viodrtb",
            "nombre": "Alberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 86,
            "equipoId": "c33k9x2"
        },
        {
            "id": "jpgkwjm",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 64,
            "equipoId": "c33k9x2"
        },
        {
            "id": "bige8dc",
            "nombre": "Alberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 73,
            "equipoId": "c33k9x2"
        },
        {
            "id": "jjrmbu0",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 86,
            "equipoId": "c33k9x2"
        },
        {
            "id": "bjladdk",
            "nombre": "Alberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 70,
            "equipoId": "c33k9x2"
        },
        {
            "id": "g8f9erp",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 80,
            "equipoId": "c33k9x2"
        },
        {
            "id": "gdx1jo5",
            "nombre": "Ignacio",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 73,
            "equipoId": "c33k9x2"
        },
        {
            "id": "9g9pp60",
            "nombre": "Luis",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 99,
            "equipoId": "c33k9x2"
        },
        {
            "id": "5nq2fyl",
            "nombre": "Daniel",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 94,
            "equipoId": "c33k9x2"
        },
        {
            "id": "heib421",
            "nombre": "Alberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 67,
            "equipoId": "c33k9x2"
        },
        {
            "id": "yfxtpw2",
            "nombre": "Ignacio",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 82,
            "equipoId": "c33k9x2"
        },
        {
            "id": "6g8trfy",
            "nombre": "Carlos",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 174,
            "peso": 70,
            "equipoId": "c33k9x2"
        },
        {
            "id": "bjgs5n2",
            "nombre": "Roberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 77,
            "equipoId": "c33k9x2"
        },
        {
            "id": "vivuqw1",
            "nombre": "Daniel",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 78,
            "equipoId": "c33k9x2"
        },
        {
            "id": "1fd1tr1",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 199,
            "peso": 62,
            "equipoId": "c33k9x2"
        },
        {
            "id": "fmdlfek",
            "nombre": "Luis",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 64,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "aw0gzcy",
            "nombre": "Pedro",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 66,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "qjnly9n",
            "nombre": "Federico",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 173,
            "peso": 77,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "osr02fe",
            "nombre": "Esteban",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 68,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "o7yor9e",
            "nombre": "Pedro",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 168,
            "peso": 62,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "qjkca3u",
            "nombre": "Juan",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 191,
            "peso": 76,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "k1b1l5j",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 179,
            "peso": 89,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "9l0em94",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 186,
            "peso": 94,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "1wi7mnh",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 163,
            "peso": 73,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "92mjudb",
            "nombre": "Ignacio",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 200,
            "peso": 83,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "wglu3b8",
            "nombre": "Alberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 86,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "0e0l30o",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 194,
            "peso": 70,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "xztul1b",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 85,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "pq1yjzp",
            "nombre": "Juan",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 163,
            "peso": 69,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "emj9av0",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 84,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "qmuvn46",
            "nombre": "Ignacio",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 78,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "f4guyvm",
            "nombre": "Javier",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 76,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "gnoacvm",
            "nombre": "Esteban",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 180,
            "peso": 67,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "ybehyb3",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 174,
            "peso": 69,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "9l75mbe",
            "nombre": "Esteban",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 199,
            "peso": 72,
            "equipoId": "d5yi8ir"
        },
        {
            "id": "lomsimc",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 165,
            "peso": 65,
            "equipoId": "1i9u69t"
        },
        {
            "id": "7rptigf",
            "nombre": "Carlos",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 67,
            "equipoId": "1i9u69t"
        },
        {
            "id": "irbr30c",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 166,
            "peso": 81,
            "equipoId": "1i9u69t"
        },
        {
            "id": "1so0upk",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 76,
            "equipoId": "1i9u69t"
        },
        {
            "id": "lt3esln",
            "nombre": "Alberto",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 165,
            "peso": 87,
            "equipoId": "1i9u69t"
        },
        {
            "id": "dghbquw",
            "nombre": "Federico",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 177,
            "peso": 95,
            "equipoId": "1i9u69t"
        },
        {
            "id": "a2oscdg",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 185,
            "peso": 82,
            "equipoId": "1i9u69t"
        },
        {
            "id": "jmirv2a",
            "nombre": "Carlos",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 66,
            "equipoId": "1i9u69t"
        },
        {
            "id": "aebisv7",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 76,
            "equipoId": "1i9u69t"
        },
        {
            "id": "tvonb2j",
            "nombre": "Esteban",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 66,
            "equipoId": "1i9u69t"
        },
        {
            "id": "74yyioo",
            "nombre": "Roberto",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 63,
            "equipoId": "1i9u69t"
        },
        {
            "id": "s7m8xbu",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 167,
            "peso": 82,
            "equipoId": "1i9u69t"
        },
        {
            "id": "29809dy",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 92,
            "equipoId": "1i9u69t"
        },
        {
            "id": "fw4ie4f",
            "nombre": "Carlos",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 177,
            "peso": 88,
            "equipoId": "1i9u69t"
        },
        {
            "id": "pcp5ssv",
            "nombre": "Federico",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 99,
            "equipoId": "1i9u69t"
        },
        {
            "id": "mgzqyho",
            "nombre": "Esteban",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 86,
            "equipoId": "1i9u69t"
        },
        {
            "id": "aq790ye",
            "nombre": "Federico",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 160,
            "peso": 66,
            "equipoId": "1i9u69t"
        },
        {
            "id": "9l9n5w5",
            "nombre": "Roberto",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 87,
            "equipoId": "1i9u69t"
        },
        {
            "id": "xygf1dk",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 83,
            "equipoId": "1i9u69t"
        },
        {
            "id": "2inl9x8",
            "nombre": "Esteban",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 197,
            "peso": 89,
            "equipoId": "1i9u69t"
        },
        {
            "id": "kj528xo",
            "nombre": "Luis",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 162,
            "peso": 63,
            "equipoId": "3gq2oob"
        },
        {
            "id": "by8srdi",
            "nombre": "Esteban",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 165,
            "peso": 93,
            "equipoId": "3gq2oob"
        },
        {
            "id": "usuk8s9",
            "nombre": "Roberto",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 172,
            "peso": 69,
            "equipoId": "3gq2oob"
        },
        {
            "id": "nfoie2h",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 184,
            "peso": 71,
            "equipoId": "3gq2oob"
        },
        {
            "id": "knjp45j",
            "nombre": "Carlos",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 169,
            "peso": 83,
            "equipoId": "3gq2oob"
        },
        {
            "id": "ktzsc01",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 87,
            "equipoId": "3gq2oob"
        },
        {
            "id": "o0vh9lp",
            "nombre": "Javier",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 161,
            "peso": 72,
            "equipoId": "3gq2oob"
        },
        {
            "id": "ws0izsw",
            "nombre": "Carlos",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 178,
            "peso": 78,
            "equipoId": "3gq2oob"
        },
        {
            "id": "gtubv7e",
            "nombre": "Ignacio",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 177,
            "peso": 97,
            "equipoId": "3gq2oob"
        },
        {
            "id": "i1mk6jj",
            "nombre": "Javier",
            "apellidos": "Rodríguez",
            "nacionalidad": "España",
            "altura": 175,
            "peso": 82,
            "equipoId": "3gq2oob"
        },
        {
            "id": "59gych1",
            "nombre": "Daniel",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 168,
            "peso": 61,
            "equipoId": "3gq2oob"
        },
        {
            "id": "6jwz2dl",
            "nombre": "Alberto",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 176,
            "peso": 85,
            "equipoId": "3gq2oob"
        },
        {
            "id": "xi3mmbk",
            "nombre": "Esteban",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 65,
            "equipoId": "3gq2oob"
        },
        {
            "id": "wqme1q6",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 189,
            "peso": 61,
            "equipoId": "3gq2oob"
        },
        {
            "id": "p6accvd",
            "nombre": "Juan",
            "apellidos": "Pérez",
            "nacionalidad": "España",
            "altura": 187,
            "peso": 62,
            "equipoId": "3gq2oob"
        },
        {
            "id": "ibj632v",
            "nombre": "Javier",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 186,
            "peso": 76,
            "equipoId": "3gq2oob"
        },
        {
            "id": "040rfqn",
            "nombre": "Pedro",
            "apellidos": "González",
            "nacionalidad": "España",
            "altura": 181,
            "peso": 96,
            "equipoId": "3gq2oob"
        },
        {
            "id": "2bf1mev",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 171,
            "peso": 85,
            "equipoId": "3gq2oob"
        },
        {
            "id": "s9ppmvg",
            "nombre": "Pedro",
            "apellidos": "Fernández",
            "nacionalidad": "España",
            "altura": 193,
            "peso": 67,
            "equipoId": "3gq2oob"
        },
        {
            "id": "qb5fjpt",
            "nombre": "Carlos",
            "apellidos": "García",
            "nacionalidad": "España",
            "altura": 195,
            "peso": 79,
            "equipoId": "3gq2oob"
        }
    ],
    "equipos": [
        {
            "id": "h6uxalb",
            "nombre": "Dragones de Valladolid RC",
            "poblacion": "Valladolid",
            "direccion": "Valladolid Stadium",
            "estadio": "Valladolid Arena"
        },
        {
            "id": "rsc0jp5",
            "nombre": "Linces de Valladolid RC",
            "poblacion": "Valladolid",
            "direccion": "Valladolid Stadium",
            "estadio": "Valladolid Arena"
        },
        {
            "id": "kakmwyu",
            "nombre": "Aguilas de Valencia RC",
            "poblacion": "Valencia",
            "direccion": "Valencia Stadium",
            "estadio": "Valencia Arena"
        },
        {
            "id": "gfzhmn0",
            "nombre": "Aguilas de Sevilla RC",
            "poblacion": "Sevilla",
            "direccion": "Sevilla Stadium",
            "estadio": "Sevilla Arena"
        },
        {
            "id": "42qvjtj",
            "nombre": "Rinos de Coruña RC",
            "poblacion": "Coruña",
            "direccion": "Coruña Stadium",
            "estadio": "Coruña Arena"
        },
        {
            "id": "gyezttf",
            "nombre": "Pumas de Bilbao RC",
            "poblacion": "Bilbao",
            "direccion": "Bilbao Stadium",
            "estadio": "Bilbao Arena"
        },
        {
            "id": "o4p4hei",
            "nombre": "Pumas de Barcelona RC",
            "poblacion": "Barcelona",
            "direccion": "Barcelona Stadium",
            "estadio": "Barcelona Arena"
        },
        {
            "id": "2t4zb9n",
            "nombre": "Pumas de Jaen RC",
            "poblacion": "Jaen",
            "direccion": "Jaen Stadium",
            "estadio": "Jaen Arena"
        },
        {
            "id": "btcv159",
            "nombre": "Dragones de Valladolid RC",
            "poblacion": "Valladolid",
            "direccion": "Valladolid Stadium",
            "estadio": "Valladolid Arena"
        },
        {
            "id": "1j3jq70",
            "nombre": "Gorilas de Coruña RC",
            "poblacion": "Coruña",
            "direccion": "Coruña Stadium",
            "estadio": "Coruña Arena"
        },
        {
            "id": "svwshyb",
            "nombre": "Osos de Bilbao RC",
            "poblacion": "Bilbao",
            "direccion": "Bilbao Stadium",
            "estadio": "Bilbao Arena"
        },
        {
            "id": "c33k9x2",
            "nombre": "Dragones de Jaen RC",
            "poblacion": "Jaen",
            "direccion": "Jaen Stadium",
            "estadio": "Jaen Arena"
        },
        {
            "id": "d5yi8ir",
            "nombre": "Tiburones de Sevilla RC",
            "poblacion": "Sevilla",
            "direccion": "Sevilla Stadium",
            "estadio": "Sevilla Arena"
        },
        {
            "id": "1i9u69t",
            "nombre": "Leones de Sevilla RC",
            "poblacion": "Sevilla",
            "direccion": "Sevilla Stadium",
            "estadio": "Sevilla Arena"
        },
        {
            "id": "3gq2oob",
            "nombre": "Leones de Madrid RC",
            "poblacion": "Madrid",
            "direccion": "Madrid Stadium",
            "estadio": "Madrid Arena"
        }
    ],
    "partidos": [
        {
            "id": "1738413880356-h6uxalb-3gq2oob",
            "jornadaId": "1738413880354_1",
            "local": "h6uxalb",
            "visitante": "3gq2oob",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880356-3gq2oob-h6uxalb",
            "jornadaId": "1738413880355_4",
            "local": "3gq2oob",
            "visitante": "h6uxalb",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880358-kakmwyu-gyezttf",
            "jornadaId": "1738413880354_1",
            "local": "kakmwyu",
            "visitante": "gyezttf",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880358-gyezttf-kakmwyu",
            "jornadaId": "1738413880355_4",
            "local": "gyezttf",
            "visitante": "kakmwyu",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880360-kakmwyu-h6uxalb",
            "jornadaId": "1738413880359_2",
            "local": "kakmwyu",
            "visitante": "h6uxalb",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880360-h6uxalb-kakmwyu",
            "jornadaId": "1738413880360_5",
            "local": "h6uxalb",
            "visitante": "kakmwyu",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880362-3gq2oob-gyezttf",
            "jornadaId": "1738413880359_2",
            "local": "3gq2oob",
            "visitante": "gyezttf",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880362-gyezttf-3gq2oob",
            "jornadaId": "1738413880360_5",
            "local": "gyezttf",
            "visitante": "3gq2oob",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880365-h6uxalb-gyezttf",
            "jornadaId": "1738413880363_3",
            "local": "h6uxalb",
            "visitante": "gyezttf",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880365-gyezttf-h6uxalb",
            "jornadaId": "1738413880365_6",
            "local": "gyezttf",
            "visitante": "h6uxalb",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880366-3gq2oob-kakmwyu",
            "jornadaId": "1738413880363_3",
            "local": "3gq2oob",
            "visitante": "kakmwyu",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        },
        {
            "id": "1738413880366-kakmwyu-3gq2oob",
            "jornadaId": "1738413880365_6",
            "local": "kakmwyu",
            "visitante": "3gq2oob",
            "puntosLocal": 0,
            "puntosVisitante": 0,
            "puntosCLocal": 0,
            "puntosCVisitante": 0,
            "jugadoresLocal": [],
            "jugadoresVisitante": [],
            "fecha": "2025-02-1",
            "jugado": false
        }
    ],
    "jornadas": [
        {
            "id": "1738413880354_1",
            "fecha": "2025-02-01T12:44:40.354Z",
            "numero": 1,
            "ligaId": "1738413880352"
        },
        {
            "id": "1738413880355_4",
            "fecha": "2025-02-01T12:44:40.355Z",
            "numero": 4,
            "ligaId": "1738413880352"
        },
        {
            "id": "1738413880359_2",
            "fecha": "2025-02-01T12:44:40.359Z",
            "numero": 2,
            "ligaId": "1738413880352"
        },
        {
            "id": "1738413880360_5",
            "fecha": "2025-02-01T12:44:40.360Z",
            "numero": 5,
            "ligaId": "1738413880352"
        },
        {
            "id": "1738413880363_3",
            "fecha": "2025-02-01T12:44:40.363Z",
            "numero": 3,
            "ligaId": "1738413880352"
        },
        {
            "id": "1738413880365_6",
            "fecha": "2025-02-01T12:44:40.365Z",
            "numero": 6,
            "ligaId": "1738413880352"
        }
    ],
    "ligas": [
        {
            "id": "1738413880352",
            "nombre": "Primera",
            "year": "2025",
            "equipos": [
                "h6uxalb",
                "kakmwyu",
                "gyezttf",
                "3gq2oob"
            ]
        }
    ],
    "clasificaciones": [
        {
            "id": "1738413880368_h6uxalb",
            "liga": "1738413880352",
            "equipo": "h6uxalb",
            "puntos": 0,
            "partidosJugados": 0,
            "partidosGanados": 0,
            "partidosEmpatados": 0,
            "partidosPerdidos": 0,
            "puntosAnotados": 0,
            "puntosRecibidos": 0
        },
        {
            "id": "1738413880369_kakmwyu",
            "liga": "1738413880352",
            "equipo": "kakmwyu",
            "puntos": 0,
            "partidosJugados": 0,
            "partidosGanados": 0,
            "partidosEmpatados": 0,
            "partidosPerdidos": 0,
            "puntosAnotados": 0,
            "puntosRecibidos": 0
        },
        {
            "id": "1738413880369_gyezttf",
            "liga": "1738413880352",
            "equipo": "gyezttf",
            "puntos": 0,
            "partidosJugados": 0,
            "partidosGanados": 0,
            "partidosEmpatados": 0,
            "partidosPerdidos": 0,
            "puntosAnotados": 0,
            "puntosRecibidos": 0
        },
        {
            "id": "1738413880370_3gq2oob",
            "liga": "1738413880352",
            "equipo": "3gq2oob",
            "puntos": 0,
            "partidosJugados": 0,
            "partidosGanados": 0,
            "partidosEmpatados": 0,
            "partidosPerdidos": 0,
            "puntosAnotados": 0,
            "puntosRecibidos": 0
        }
    ],
    "noticias": [
        {
            "id": "1738144459997",
            "fecha": 29,
            "titulo": "Los Pumas vencen a Los Springboks en un emocionante partido de rugby",
            "cabecera": "En un emocionante encuentro de rugby, el equipo de \"Los Pumas\" de Argentina logró una histórica victoria sobre \"Los Springboks\" de Sudáfrica con un marcador final de 31-29. El partido, correspondiente a la fecha 6 del Rugby Championship, se disputó en el estadio Libertadores de América en Buenos Aires, Argentina, y mantuvo a los espectadores al borde de sus asientos hasta el último segundo.",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        },
        {
            "id": "29",
            "fecha": 29,
            "titulo": "Segunda noticia de prueba",
            "cabecera": "Este es el encabezado de la segunda noticia, que es una noticia de prueba para testear la aplicación",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        },
        {
            "id": "1738144751383",
            "fecha": "2025-01-29",
            "titulo": "Tercera noticia de prueba",
            "cabecera": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, laudantium ipsam aperiam ipsum, sequi dolores nisi tempora, eaque suscipit nihil nobis mollitia deleniti aliquam accusantium praesentium? Inventore delectus ullam vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        },
        {
            "id": "1738144792043",
            "fecha": "2025-01-29",
            "titulo": "Cuarta noticia de prueba",
            "cabecera": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, laudantium ipsam aperiam ipsum, sequi dolores nisi tempora, eaque suscipit nihil nobis mollitia deleniti aliquam accusantium praesentium? Inventore delectus ullam vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        },
        {
            "id": "1738144812210",
            "fecha": "2025-01-29",
            "titulo": "Otra noticia mas",
            "cabecera": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, laudantium ipsam aperiam ipsum, sequi dolores nisi tempora, eaque suscipit nihil nobis mollitia deleniti aliquam accusantium praesentium? Inventore delectus ullam vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        },
        {
            "id": "1738144832867",
            "fecha": "2025-01-29",
            "titulo": "Esta es una nueva noticia",
            "cabecera": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, laudantium ipsam aperiam ipsum, sequi dolores nisi tempora, eaque suscipit nihil nobis mollitia deleniti aliquam accusantium praesentium? Inventore delectus ullam vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        },
        {
            "id": "1738144867701",
            "fecha": "2025-01-29",
            "titulo": "Esta es la ultima noticia de prueba",
            "cabecera": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, laudantium ipsam aperiam ipsum, sequi dolores nisi tempora, eaque suscipit nihil nobis mollitia deleniti aliquam accusantium praesentium? Inventore delectus ullam vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "imagen": "",
            "contenido": "El partido comenzó con un ritmo frenético, con ambos equipos buscando imponer su juego. \"Los Pumas\" salieron al ataque desde el primer minuto, y su esfuerzo se vio recompensado con un try tempranero de su capitán, Julián Montoya. \"Los Springboks\", por su parte, no se quedaron atrás y respondieron con un try de su ala estrella, Cheslin Kolbe. El primer tiempo terminó con una ventaja mínima para \"Los Pumas\" por 17-15.\n\nEn la segunda mitad, el partido se volvió aún más intenso. \"Los Pumas\" lograron aumentar su ventaja gracias a un penal convertido por su apertura, Santiago Carreras, y a un nuevo try de Montoya. \"Los Springboks\" no se rindieron y lucharon por remontar el marcador, pero la defensa de \"Los Pumas\" se mantuvo sólida y evitó que los sudafricanos pudieran acercarse en el marcador. El partido finalizó con el marcador 31-29 a favor de \"Los Pumas\", quienes celebraron una victoria histórica ante su clásico rival.\n\nEste triunfo representa un gran paso para el rugby argentino, que sigue creciendo a pasos agigantados y demostrando su nivel competitivo a nivel internacional. \"Los Pumas\" han demostrado que pueden competir de igual a igual con los mejores equipos del mundo, y esta victoria ante \"Los Springboks\" es una prueba más de ello.\n\nEl partido entre \"Los Pumas\" y \"Los Springboks\" fue un verdadero espectáculo de rugby, con un juego emocionante y un final de infarto. Los fanáticos del rugby disfrutaron de un partido de alto nivel, y los jugadores de ambos equipos demostraron su pasión y entrega en el campo de juego."
        }
    ],
    "usuarios": [
        {
            "id": "1738250883414",
            "nombre": "Ramon",
            "apellidos": "Carralero",
            "nickname": "JRamon",
            "email": "prueba@email.com",
            "rol": "admin",
            "password": "123456"
        },
        {
            "id": "1738522558252",
            "nombre": "aaa",
            "apellidos": "aaa",
            "nickname": "aaa",
            "email": "p@e",
            "rol": "user",
            "password": "123"
        }
    ],
    "accionesPartido": [],
    "estadisticasJugadores": [],
    "mainInfo": {
        "mainLiga": "",
        "mainNoticia": ""
    },
    "isLoading": false,
    "error": false
}

http.createServer(function server_onRequest (request, response) {
    let pathname = url.parse(request.url).pathname;

    console.log(`Request for ${pathname} received.`);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    response.writeHead(200);

    response.write(JSON.stringify(storeJSON));
    response.end();
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');