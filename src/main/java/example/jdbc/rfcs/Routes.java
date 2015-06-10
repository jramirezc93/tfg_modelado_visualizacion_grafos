package example.jdbc.rfc;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.servlet.SparkApplication;

import java.net.URI;
import java.net.URLDecoder;

import static spark.Spark.get;

public class Routes implements SparkApplication {

    private Gson gson = new GsonBuilder().disableHtmlEscaping().create();
    private Service service;

    public Routes(Service service) {
        this.service = service;
    }

    public void init() {
        get(new Route("/graph") {
            public Object handle(Request request, Response response) {
                int limit = request.queryParams("limit") != null ? Integer.valueOf(request.queryParams("limit")) : 2;
                String company = "";
                String state = "";
                String priority = "";
                String user = "";
                String change = "";
                if(String.valueOf(request.queryParams("c")).equals("undefined")){
                   company = ".*";
                }else{
                   company = request.queryParams("c");
                }
                if(String.valueOf(request.queryParams("s")).equals("undefined")){
                   state = ".*";
                }else{
                   state = request.queryParams("s");
                }
                if(String.valueOf(request.queryParams("p")).equals("undefined")){
                   priority= ".*";
                }else{
                   priority= request.queryParams("p");
                }
                if(String.valueOf(request.queryParams("u")).equals("undefined")){
                   user= ".*";
                }else{
                   user= request.queryParams("u");
                }
                if(String.valueOf(request.queryParams("ch")).equals("undefined")){
                   change= ".*";
                }else{
                   change= request.queryParams("ch");
                }
                return gson.toJson(service.graph(limit,request.queryParams("q"),company,state,priority,user,change));
            }
        });

     /*   get(new Route("/time") {
            public Object handle(Request request, Response response) {
                int limit = request.queryParams("limit") != null ? Integer.valueOf(request.queryParams("limit")) : 2;
                return gson.toJson(service.time(limit,request.queryParams("q")));
            }
        });*/
        get(new Route("/states") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.states());
            }
        });
                get(new Route("/priority") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.priority());
            }
        });
                                get(new Route("/changetype") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.changetype());
            }
        });
            get(new Route("/company") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.company());
            }
        });
                        get(new Route("/infoinicial") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.infoinicial());
            }
        });
            get(new Route("/rfcs") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.rfcs());
            }
        });
            get(new Route("/users") {
            public Object handle(Request request, Response response) {
                return gson.toJson(service.users());
            }
        });




        };

    }

