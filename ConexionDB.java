import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class ConexionDB {
    public static void main(String[] args) {
        // Cadena de conexión para tu SQL Server local (Autenticación de Windows)
        String url = "jdbc:sqlserver://localhost:1433;databaseName=DomoConectaDB;user=sa;password=DomoConecta2026*;encrypt=true;trustServerCertificate=true;";

        System.out.println("Intentando conectar a la base de datos DomoConectaDB...");

        try {
            // Establecer la conexión
            Connection conexion = DriverManager.getConnection(url);
            System.out.println(" ¡Conexión exitosa a SQL Server desde Java!");

            // Consulta de prueba a la tabla usuarios
            Statement statement = conexion.createStatement();
            ResultSet resultado = statement.executeQuery("SELECT * FROM usuarios");

            System.out.println("--- Lista de usuarios en la Base de Datos ---");
            while (resultado.next()) {
                System.out.println("ID: " + resultado.getInt("id") + 
                                   " | Nombre: " + resultado.getString("nombre") + 
                                   " | Rol: " + resultado.getString("rol"));
            }

            // Cerrar conexiones
            resultado.close();
            statement.close();
            conexion.close();

        } catch (Exception e) {
            System.err.println(" Error al conectar con la base de datos:");
            e.printStackTrace();
        }
    }
}