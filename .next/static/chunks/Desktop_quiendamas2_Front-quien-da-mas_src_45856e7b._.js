(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/services/mockAuthService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock del servicio de autenticación para desarrollo
__turbopack_context__.s([
    "MockAuthService",
    ()=>MockAuthService
]);
// Usuarios de prueba
const mockUsers = [
    {
        id: '1',
        email: 'admin@quienmas.com',
        password: 'admin123',
        name: 'Administrador'
    },
    {
        id: '2',
        email: 'usuario@quienmas.com',
        password: 'usuario123',
        name: 'Usuario Prueba'
    },
    {
        id: '3',
        email: 'test@quienmas.com',
        password: 'test123',
        name: 'Usuario Test'
    }
];
// Función para simular delay de red
const simulateNetworkDelay = function() {
    let ms = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1000;
    return new Promise((resolve)=>setTimeout(resolve, ms));
};
// Función para generar token JWT mock
const generateMockToken = (userId)=>{
    const header = btoa(JSON.stringify({
        alg: 'HS256',
        typ: 'JWT'
    }));
    const payload = btoa(JSON.stringify({
        userId,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    }));
    const signature = btoa('mock-signature');
    return "".concat(header, ".").concat(payload, ".").concat(signature);
};
class MockAuthService {
    static async login(credentials) {
        try {
            // Simular delay de red
            await simulateNetworkDelay(1500);
            // Buscar usuario
            const user = mockUsers.find((u)=>u.email === credentials.email && u.password === credentials.password);
            if (!user) {
                return {
                    success: false,
                    message: 'Credenciales inválidas. Verifica tu email y contraseña.'
                };
            }
            // Generar token mock
            const token = generateMockToken(user.id);
            // Simular éxito
            return {
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            };
        } catch (error) {
            console.error('Error en MockAuthService.login:', error);
            return {
                success: false,
                message: 'Error interno del servidor. Intenta nuevamente.'
            };
        }
    }
    static async logout() {
        try {
            // Simular delay de red
            await simulateNetworkDelay(500);
            console.log('Logout exitoso (mock)');
        } catch (error) {
            console.error('Error en logout:', error);
        }
    }
    static getToken() {
        return localStorage.getItem('authToken');
    }
    static isAuthenticated() {
        return !!this.getToken();
    }
    // Método para obtener información del usuario actual
    static getCurrentUser() {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user = mockUsers.find((u)=>u.id === payload.userId);
            return user ? {
                id: user.id,
                email: user.email,
                name: user.name
            } : null;
        } catch (error) {
            console.error('Error al decodificar token:', error);
            return null;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$services$2f$mockAuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/src/services/mockAuthService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DashboardPage() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            // Verificar si el usuario está autenticado
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$services$2f$mockAuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockAuthService"].getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
            } else {
                // Si no hay usuario, redirigir al login
                window.location.href = '/login';
            }
            setIsLoading(false);
        }
    }["DashboardPage.useEffect"], []);
    const handleLogout = ()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('rememberMe');
        window.location.href = '/';
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-yellow flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-2xl text-dark-purple",
                children: "Cargando..."
            }, void 0, false, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    if (!user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-yellow flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden md:flex flex-col w-64 bg-dark-purple text-white rounded-r-3xl shadow-2xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-8",
                        children: "Panel de Usuario"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full text-left hover:bg-white hover:text-dark-purple rounded-lg px-4 py-2 transition-colors",
                                children: "🏠 Inicio"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full text-left hover:bg-white hover:text-dark-purple rounded-lg px-4 py-2 transition-colors",
                                children: "👤 Perfil"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full text-left hover:bg-white hover:text-dark-purple rounded-lg px-4 py-2 transition-colors",
                                children: "📊 Actividad"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full text-left hover:bg-white hover:text-dark-purple rounded-lg px-4 py-2 transition-colors",
                                children: "⚙️ Configuración"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "mt-10 bg-orange-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors",
                                children: "Cerrar Sesión"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-2xl p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-5xl font-bold text-dark-purple mb-4",
                                        children: [
                                            "¡Bienvenido, ",
                                            user.name,
                                            "!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-gray-700",
                                        children: "Nos alegra verte de nuevo 😊. Aquí puedes revisar tu información, tus actividades y estadísticas generales."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-yellow bg-opacity-20 p-6 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-dark-purple mb-4",
                                                children: "Información del Usuario"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 84,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 text-gray-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "ID:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 88,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            user.id
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Email:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 89,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            user.email
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Nombre:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 90,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            user.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Rol:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 91,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            user.role || 'Usuario registrado'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Último acceso:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 92,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            new Date().toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue bg-opacity-20 p-6 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-dark-purple mb-4",
                                                children: "Estado de Autenticación"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 text-gray-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Autenticado:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ✅ Sí"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Token:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$services$2f$mockAuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockAuthService"].getToken() ? '✅ Presente' : '❌ No encontrado'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Recordarme:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            localStorage.getItem('rememberMe') ? '✅ Activado' : '❌ Desactivado'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Sesión iniciada:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 22
                                                            }, this),
                                                            " ",
                                                            localStorage.getItem('isLoggedIn') ? '✅ Activa' : '🔴 Inactiva'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-purple-100 p-6 rounded-xl mb-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-dark-purple mb-4",
                                        children: "Actividad Reciente"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-gray-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "📩 Inicio de sesión exitoso — ",
                                                    new Date().toLocaleTimeString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "🧭 Navegó al panel principal"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "📁 Consultó su perfil de usuario"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "⚙️ Revisó configuración de cuenta"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-100 p-6 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-green-700",
                                                children: "12"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700 mt-2",
                                                children: "Sesiones activas"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-orange-100 p-6 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-orange-600",
                                                children: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700 mt-2",
                                                children: "Notificaciones nuevas"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-100 p-6 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-blue-600",
                                                children: "98%"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700 mt-2",
                                                children: "Nivel de actividad"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 p-6 bg-green-100 rounded-xl text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-green-800 mb-4",
                                        children: "🎉 ¡Login Exitoso!"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-green-700",
                                        children: "Has iniciado sesión correctamente usando el sistema mock. Tu información se encuentra sincronizada y puedes continuar navegando en el panel."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/dashboard/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_quiendamas2_Front-quien-da-mas_src_45856e7b._.js.map