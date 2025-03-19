import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Definir el tipo del contexto
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Crear el contexto con un valor por defecto
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// Proveedor del tema
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Cargar el tema guardado en localStorage o usar "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Efecto para aplicar el tema en el body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el tema en cualquier componente
export const useTheme = () => useContext(ThemeContext);
