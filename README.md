
# Ésta es una librería de personaliza de logging basada en winston.
# Es una librería minimal, toma solo algunas de las funcionalidades que presenta winston, y permite realizar un guardado de log tanto en consola como en un archivo de texto a la vez, con el siguiente formato de ejemplo: 

[fecha][numero de proceso][nivel del log][archivo que generó el log][tiempo en milisegundos (opcional)] >>> mensaje

# Ejemplos: 

[2020-06-07 12:53:22][30284][info][../Logger/index.js] >>> Mensaje de información
[2020-06-07 12:53:22][30284][debug][../Logger/index.js][5] >>> Mensaje debug 
[2020-06-07 12:53:22][30284][warn][../Logger/index.js][0] >>> Mensaje de alerta 
[2020-06-07 12:53:22][30284][error][../Logger/index.js] >>> Mensaje de error 

# Para importarla debe hacer lo siguiente: 

var Logger = require('logger')

# Luego debe crear una instancia, en cada archivo donde necesite loggear. Puede hacerlo indicando o no la ruta destino del log: 

# 1) Indicarndo ruta destino: 

var logger = new Logger(__filename, __dirname + '\\MyFolderLog\\')

# 2) No indicando ruta destino: 

var logger = new Logger(__filename, "")

# Obs: en el primer argumento, debe siempre agregar __filename, que es la url global del script (archivo) donde estamos creando la librería.


# Estos son los tipos de mensaje que puede loggear, con niveles INFO, DEBUG, WARN y ERROR: 

  logger.info('Mensaje info sin calculo de tiempo')
  logger.warn('Mensaje warn sin calculo de tiempo')
  logger.error('Mensaje error sin calculo de tiempo')
  logger.debug('Mensaje debug sin calculo de tiempo')

  # También puede agregar un tiempo de inicio, y el logger calculrá el tiempo final, y la diferencia en milisegundos: 

  var initTime = new Date().getTime()

  logger.info('Mensaje info sin calculo de tiempo',initTime)
  logger.warn('Mensaje warn sin calculo de tiempo',initTime)
  logger.error('Mensaje error sin calculo de tiempo',initTime)
  logger.debug('Mensaje debug sin calculo de tiempo',initTime)

# Por último también podrá agregar un tiempo final, y el logger calculará la diferencia en milisegundos: 

  var endTime = new Date().getTime()

  logger.info('Mensaje info sin calculo de tiempo',initTime,endTime)
  logger.warn('Mensaje warn sin calculo de tiempo',initTime,endTime)
  logger.error('Mensaje error sin calculo de tiempo',initTime,endTime)
  logger.debug('Mensaje debug sin calculo de tiempo',initTime,endTime)
