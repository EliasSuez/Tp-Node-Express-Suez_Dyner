class ValidacionesHelper {
  
    /**
     * Intenta convertir un valor a entero. Si no se puede o es null/undefined, devuelve el valor por defecto.
     * @param {*} value - Valor a verificar.
     * @param {*} defaultValue - Valor por defecto.
     * @returns {number} Un número entero.
     */
    getIntegerOrDefault = (value, defaultValue) => {
      if (value === undefined || value === null) return defaultValue;
  
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultValue : parsed;
    };
  
    /**
     * Retorna un string si el valor no es null ni undefined, si lo es, retorna el valor por defecto.
     * @param {*} value - Valor a verificar.
     * @param {*} defaultValue - Valor por defecto.
     * @returns {string} Un string válido.
     */
    getStringOrDefault = (value, defaultValue) => {
      return value === undefined || value === null ? defaultValue : value;
    };
  }
  
  // Exportar una instancia
  export default new ValidacionesHelper();
  