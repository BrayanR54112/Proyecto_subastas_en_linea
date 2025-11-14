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
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/hooks/useMockAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMockAuth",
    ()=>useMockAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$services$2f$mockAuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/src/services/mockAuthService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const useMockAuth = ()=>{
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMockAuth.useCallback[login]": async (credentials)=>{
            setIsLoading(true);
            setError(null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$services$2f$mockAuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockAuthService"].login(credentials);
                if (response.success) {
                    if (response.user) {
                        localStorage.setItem('user', JSON.stringify(response.user));
                    }
                    if (response.token) {
                        localStorage.setItem('authToken', response.token);
                    }
                    localStorage.setItem('isLoggedIn', 'true');
                    router.push('/dashboard');
                } else {
                    setError(response.message || 'Error en el login');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useMockAuth.useCallback[login]"], [
        router
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMockAuth.useCallback[logout]": async ()=>{
            setIsLoading(true);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$services$2f$mockAuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockAuthService"].logout();
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('rememberMe');
                router.push('/');
            } catch (err) {
                console.error('Error en logout:', err);
            } finally{
                setIsLoading(false);
            }
        }
    }["useMockAuth.useCallback[logout]"], [
        router
    ]);
    return {
        login,
        logout,
        isLoading,
        error,
        clearError: ()=>setError(null)
    };
};
_s(useMockAuth, "GTGgoJIUzJ05/eB30KJSWaQFY48=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const LoginForm = (param)=>{
    let { onSubmit, isLoading } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (validateForm()) {
            try {
                await onSubmit(formData);
            } catch (error) {
                console.error('Error en el login:', error);
            }
        }
    };
    const handleInputChange = (e)=>{
        const { name, value, type, checked } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors((prev)=>({
                    ...prev,
                    [name]: undefined
                }));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        name: "email",
                        value: formData.email,
                        onChange: handleInputChange,
                        placeholder: "Correo electrónico",
                        className: "w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.email ? 'border-red-500' : 'border-gray-300'),
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-500 text-sm mt-1",
                        children: errors.email
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        name: "password",
                        value: formData.password,
                        onChange: handleInputChange,
                        placeholder: "Contraseña",
                        className: "w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.password ? 'border-red-500' : 'border-gray-300'),
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-500 text-sm mt-1",
                        children: errors.password
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "rememberMe",
                                checked: formData.rememberMe,
                                onChange: handleInputChange,
                                className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-700",
                                children: "Recordarme"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/forgot-password",
                        className: "text-blue-600 hover:underline",
                        children: "¿Olvidaste tu contraseña?"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",
                        children: isLoading ? 'Ingresando...' : 'INGRESAR'
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.push("/register"),
                        className: "w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors duration-200",
                        disabled: isLoading,
                        children: "REGÍSTRATE"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-700 text-lg font-semibold mb-4",
                                children: "SÍGUENOS"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                lineNumber: 154,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center space-x-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "text-blue-600 hover:text-blue-800 text-2xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {}, void 0, false, {
                                            fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                            lineNumber: 157,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                        lineNumber: 156,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "text-blue-600 hover:text-blue-800 text-2xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"], {}, void 0, false, {
                                            fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                            lineNumber: 160,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                        lineNumber: 159,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "text-blue-600 hover:text-blue-800 text-2xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {}, void 0, false, {
                                            fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                            lineNumber: 163,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                        lineNumber: 162,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                                lineNumber: 155,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                        lineNumber: 153,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LoginForm, "XeQqd1e9v9e3UogXP6//UalE8Zk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LoginForm;
const __TURBOPACK__default__export__ = LoginForm;
var _c;
__turbopack_context__.k.register(_c, "LoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoginPanel = (param)=>{
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-8 rounded-r-3xl w-full h-full flex flex-col justify-center",
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginPanel.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = LoginPanel;
const __TURBOPACK__default__export__ = LoginPanel;
var _c;
__turbopack_context__.k.register(_c, "LoginPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const WelcomePanel = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[url('/images/welcomeLogin.png')] bg-center bg-no-repeat bg-cover pl-20 p-8 h-full flex flex-col justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-white text-[48px] font-bold leading-tight mb-6",
                children: [
                    "¿Quién Da",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Más?"
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-[#142045] leading-none text-[64px] font-bold mb-6",
                children: "Hola, bienvenido!"
            }, void 0, false, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[#142045] font-semibold text-[24px] mb-8 leading-relaxed max-w-md",
                children: "Sube artículos a subasta y dales una segunda vida a tus artículos."
            }, void 0, false, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors duration-200 w-fit",
                children: "EMPEZAR A SUBASTAR"
            }, void 0, false, {
                fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = WelcomePanel;
const __TURBOPACK__default__export__ = WelcomePanel;
var _c;
__turbopack_context__.k.register(_c, "WelcomePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$hooks$2f$useMockAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/src/hooks/useMockAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$components$2f$LoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$components$2f$LoginPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/LoginPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$components$2f$WelcomePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/src/components/WelcomePanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LoginPage() {
    _s();
    const { login, isLoading, error, clearError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$hooks$2f$useMockAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockAuth"])();
    const handleLogin = async (formData)=>{
        clearError(); // Limpiar errores previos
        await login(formData);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-full bg-[url('/images/loginBg.png')] bg-center bg-no-repeat bg-cover flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-6xl h-[600px] bg-white shadow-2xl overflow-hidden flex",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$components$2f$WelcomePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$components$2f$LoginPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-md mx-auto",
                            children: [
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                                    lineNumber: 33,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$components$2f$LoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    onSubmit: handleLogin,
                                    isLoading: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/quiendamas2/Front-quien-da-mas/src/app/login/page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "oZXTcylSGGgqLd0jJOjnDVQQgT4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$src$2f$hooks$2f$useMockAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockAuth"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp,
    "mergeClasses",
    ()=>mergeClasses,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = function() {
    for(var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++){
        classes[_key] = arguments[_key];
    }
    return classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
};
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((param, ref)=>{
    let { color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest } = param;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map((param)=>{
            let [tag, attrs] = param;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs);
        }),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((param, ref)=>{
        let { className, ...props } = param;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide-".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))), "lucide-".concat(iconName), className),
            ...props
        });
    });
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Instagram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "20",
            height: "20",
            x: "2",
            y: "2",
            rx: "5",
            ry: "5",
            key: "2e1cvw"
        }
    ],
    [
        "path",
        {
            d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
            key: "9exkf1"
        }
    ],
    [
        "line",
        {
            x1: "17.5",
            x2: "17.51",
            y1: "6.5",
            y2: "6.5",
            key: "r4j83e"
        }
    ]
];
const Instagram = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("instagram", __iconNode);
;
 //# sourceMappingURL=instagram.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Instagram",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript)");
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Twitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
            key: "pff0z6"
        }
    ]
];
const Twitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("twitter", __iconNode);
;
 //# sourceMappingURL=twitter.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Twitter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript)");
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Facebook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
            key: "1jg4f8"
        }
    ]
];
const Facebook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("facebook", __iconNode);
;
 //# sourceMappingURL=facebook.js.map
}),
"[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Facebook",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$quiendamas2$2f$Front$2d$quien$2d$da$2d$mas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/quiendamas2/Front-quien-da-mas/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_quiendamas2_Front-quien-da-mas_7611742c._.js.map