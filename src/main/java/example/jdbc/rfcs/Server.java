package example.jdbc.rfc;

import example.jdbc.util.Util;

import static spark.Spark.externalStaticFileLocation;
import static spark.Spark.setPort;


public class Server {

    public static void main(String[] args) {
        setPort(Util.getWebPort());
        externalStaticFileLocation("src/main/webapp");
        final Service service = new Service(Util.getNeo4jUrl());
        new Routes(service).init();
    }
}
