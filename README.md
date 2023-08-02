# Mongo DB

Se realizo una proyecto en el que creamos una base de datos en mongo db y se realizaron algunas consultas para la practica. 

## Importante

Para utilizar mongo en visual estudio es esencial instalar la extencion de "MongoDB for Visual Studio Code".

### Descripción de la funcionalidad

El código proporciona ejemplos de cómo crear colecciones e insertar documentos en MongoDB. A continuación, se enumeran las colecciones creadas y los documentos insertados:

1. **sucursal:** Contiene información sobre diferentes sucursales, como su nombre, dirección y teléfono.
2. **automovil:** Almacena datos sobre los automóviles disponibles para alquiler, incluida su marca, modelo, año, tipo, capacidad y precio diario.
3. **sucursal_automovil:** Relaciona las sucursales con los automóviles disponibles en cada una, junto con la cantidad disponible de cada automóvil en la sucursal.
4. **cliente:** Contiene información sobre los clientes, incluidos su nombre, apellido, DNI, dirección, teléfono y correo electrónico.
5. **alquiler:** Registra los alquileres realizados por los clientes, con detalles como la fecha de inicio, fecha de finalización, costo total y estado del alquiler (activo o inactivo).
6. **reserva:** Almacena las reservas realizadas por los clientes, con detalles como la fecha de reserva, fecha de inicio, fecha de finalización y estado de la reserva (pendiente o confirmado).
7. **empleado:** Contiene información sobre los empleados, como su nombre, apellido, DNI, dirección, teléfono y cargo.
8. **registro_entrega:** Registra la entrega de un automóvil al cliente al finalizar un alquiler, incluida la fecha de entrega, cantidad de combustible entregado y kilometraje entregado.
9. **registro_devolucion:** Registra la devolución de un automóvil por parte del cliente al finalizar un alquiler, incluida la fecha de devolución, cantidad de combustible devuelto, kilometraje devuelto y monto adicional si corresponde.

### Consultas

En el codigo en la seccion de consultas, nos podemos encontrar con las siguientes consultas:

1. Listar todos los clientes registrados en la base de datos.
2. Obtener todos los automóviles disponibles para alquiler.
3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
5. Obtener los detalles del alquiler con un ID_Alquiler específico.
6. Listar los empleados con el cargo de "Vendedor".
7. Mostrar la cantidad total de automóviles disponibles en cada sucursal junto con su dirección.
8. Obtener el costo total de un alquiler específico.
9. Listar los clientes con el DNI específico.
10. Mostrar todos los automóviles con una capacidad mayor a 5 personas.
11. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.
12. Listar las reservas pendientes realizadas por un cliente específico.
13. Mostrar los empleados con cargo de "Gerente" o "Asistente".
14. Obtener los datos de los clientes que realizaron al menos un alquiler.
15. Listar todos los automóviles ordenados por marca y modelo.
16. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.
17. Obtener la cantidad total de alquileres registrados en la base de datos.
18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
19. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.

Cada consulta utiliza comandos de MongoDB adecuados para obtener la información requer

ida y mostrarla en la terminal de Visual Studio Code.

## Contacto

Nombre: Carlos Villafrades Pinilla

Email: [cavillafrades@gmail.com](mailto:cavillafrades@gmail.com)