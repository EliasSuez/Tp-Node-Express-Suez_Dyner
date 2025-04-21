class DateTimeHelper {

    /**
     * Verifica si una fecha es válida.
     * @param {string} fecha - Fecha en formato 'YYYY-MM-DD'.
     * @returns {boolean} true si la fecha es válida, false si es inválida.
     */
    isDate = (fecha) => {
      const parsedDate = new Date(fecha);
      return !isNaN(parsedDate.getTime());
    };
  
    /**
     * Obtiene la fecha sin la parte de hora.
     * @param {Date} fecha - Fecha de entrada, por defecto es la fecha actual.
     * @returns {Date} Fecha solo con la parte de día, mes y año.
     */
    getOnlyDate = (fecha = new Date()) => {
      return new Date(fecha.setHours(0, 0, 0, 0));
    };
  
    /**
     * Calcula la edad actual en base a la fecha de nacimiento.
     * @param {string} fechaNacimiento - Fecha de nacimiento en formato 'YYYY-MM-DD'.
     * @returns {number} Edad actual.
     */
    getEdadActual = (fechaNacimiento) => {
      if (!this.isDate(fechaNacimiento)) return null;
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
  
    /**
     * Calcula los días restantes hasta el próximo cumpleaños.
     * @param {string} fechaNacimiento - Fecha de nacimiento en formato 'YYYY-MM-DD'.
     * @returns {number} Días restantes hasta el cumpleaños.
     */
    getDiasHastaMiCumple = (fechaNacimiento) => {
      if (!this.isDate(fechaNacimiento)) return null;
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      const timeDiff = nextBirthday - today;
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convertir milisegundos a días
    };
  
    /**
     * Obtiene el nombre del día de la semana en formato texto.
     * @param {string} fecha - Fecha en formato 'YYYY-MM-DD'.
     * @param {boolean} retornarAbreviacion - Si es true, retorna la abreviación del día.
     * @returns {string} Nombre o abreviación del día.
     */
    getDiaTexto = (fecha, retornarAbreviacion = false) => {
      if (!this.isDate(fecha)) return null;
      const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const shortDayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
      const day = new Date(fecha).getDay();
      return retornarAbreviacion ? shortDayNames[day] : dayNames[day];
    };
  
    /**
     * Obtiene el nombre del mes en formato texto.
     * @param {string} fecha - Fecha en formato 'YYYY-MM-DD'.
     * @param {boolean} retornarAbreviacion - Si es true, retorna la abreviación del mes.
     * @returns {string} Nombre o abreviación del mes.
     */
    getMesTexto = (fecha, retornarAbreviacion = false) => {
      if (!this.isDate(fecha)) return null;
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const shortMonthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const month = new Date(fecha).getMonth();
      return retornarAbreviacion ? shortMonthNames[month] : monthNames[month];
    };
  }
  
  // Exportar una instancia
  export default new DateTimeHelper();
  