package example.jdbc.rfc;

import example.jdbc.executor.CypherExecutor;
import example.jdbc.executor.JdbcCypherExecutor;
import org.neo4j.helpers.collection.IteratorUtil;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

import static org.neo4j.helpers.collection.MapUtil.map;

public class Service {

    private final CypherExecutor cypher;

    public Service(String uri) {
        cypher = createCypherExecutor(uri);
    }

    private CypherExecutor createCypherExecutor(String uri) {
        try {
            String auth = new URL(uri).getUserInfo();
            if (auth != null) {
                String[] parts = auth.split(":");
                return new JdbcCypherExecutor(uri,parts[0],parts[1]);
            }
            return new JdbcCypherExecutor(uri);
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Invalid Neo4j-ServerURL " + uri);
        }
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> graph(int limit, String id_rfc, String company, String state, String priority, String user, String change) {
        Iterator<Map<String,Object>> result = cypher.query(
                "MATCH n WITH n ORDER BY n.Order ASC " +
                " WHERE n.ID_del_RFC =~ {2} AND n.Empresa =~{3} AND n.Estado_Final =~{4} AND n.Prioridad =~{5} AND n.User=~{6} AND n.Tipo_de_Cambio=~{7} RETURN  collect(n) as nodes " +
                " LIMIT {1}", map("1",limit,"2",id_rfc,"3",company,"4",state,"5",priority,"6",user,"7",change));
        List nodes = new ArrayList();
        List rels= new ArrayList();
        int i=0;
        int source=0;
        int target=0;
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("nodes")) {
               if(i==0){
           Map<String, Object> rfc = map("title", node,"label","rfc");
                nodes.add(rfc);
                 source = i;
                 i++;
                }else{
                 target=i;
                rels.add(map("source",source,"target",target));
                 source = i;
                Map<String, Object> rfc = map("title", node,"label","rfc");
                nodes.add(rfc);
                i++;
                  
                }
              
            }
        }
        return map("nodes", nodes, "links", rels);
    }

 /*   @SuppressWarnings("unchecked")
    public Map<String, Object> time(int limit, String id_rfc) {
        String timeresultstring=new String();
        Iterator<Map<String,Object>> result = cypher.query(
                "MATCH (a:Node_RFC),(b:Node_RFC)" +
                " WHERE a.ID_del_RFC=~{1} AND b.ID_del_RFC=~{1} AND a.Inicial=1 AND b.Final=1 RETURN collect(b.Fecha_Mov_num-a.Fecha_Cre_num) as time", map("1","(?i).*"+id_rfc+".*"));
                if (result.hasNext()) {
            Map<String, Object> row = result.next();

            timeresultstring=row.get("time").toString();
        }
    

        return map("time", timeresultstring);
    }*/
    @SuppressWarnings("unchecked")
    public Map<String, Object> states() {
        List estados = new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
                "MATCH n " +
                "WITH n.Estado_Final as estado,count(n.Estado_Final) as count RETURN collect([estado,count]) as estados", map());
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("estados")) {
                estados.add(node); 
            }
        }
        return map("estados", estados);
    }
    @SuppressWarnings("unchecked")
    public Map<String, Object> priority() {
        List prioridades = new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
                "MATCH n " +
                "WITH n.Prioridad as prioridad,count(n.Prioridad) as count RETURN collect([prioridad,count]) as prioridades", map());
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("prioridades")) {
                prioridades.add(node); 
            }
        }
        return map("prioridades", prioridades);
    }
        @SuppressWarnings("unchecked")
    public Map<String, Object> changetype() {
        List cambios = new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
                "MATCH n " +
                "WITH n.Tipo_de_Cambio as cambio,count(n.Tipo_de_Cambio) as count RETURN collect([cambio,count]) as cambios", map());
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("cambios")) {
                cambios.add(node); 
            }
        }
        return map("cambios", cambios);
    }
            @SuppressWarnings("unchecked")
    public Map<String, Object> company() {
        List empresas = new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
                "MATCH n " +
                "WITH n.Empresa as empresa,count(n.Empresa) as count RETURN collect([empresa,count]) as empresas", map());
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("empresas")) {
                empresas.add(node); 
            }
        }
        return map("empresas", empresas);
    }
                @SuppressWarnings("unchecked")
    public Map<String, Object> infoinicial() {
        List infoinicial = new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
                "Match n WITH count(n) as Nodos ,count(Distinct n.Estado_Final) as Estados"+
                ", count(Distinct n.ID_del_RFC) as RFCs, count(Distinct n.Empresa) as Empresas,"+
                " count(Distinct n.Prioridad) as Prioridades, count(Distinct n.Tipo_de_Cambio) as"+
                " Cambios, count(Distinct n.User) as Usuario RETURN collect([Nodos,Estados,RFCs,Empresas,Prioridades,Cambios,Usuario]) as infoinicial", map()); 
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("infoinicial")) {
                infoinicial.add(node); 
            }
        }
        return map("infoinicial", infoinicial);
    }
        public Map<String, Object> rfcs() {
        List rfcs = new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
                "Match n WITH Distinct n.ID_del_RFC as RFCs "+
                "RETURN collect(RFCs) as rfcs", map()); 
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("rfcs")) {
                rfcs.add(node); 
            }
        }
        return map("rfcs", rfcs);
    }
            public Map<String, Object> users() {
        List users= new ArrayList();
        Iterator<Map<String,Object>> result = cypher.query(
             "MATCH n " +
                "WITH n.User as usuario,count(n.User) as count RETURN collect([usuario,count]) as users", map()); 
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            for (Object node : (Collection) row.get("users")) {
                users.add(node); 
            }
        }
        return map("users", users);
    }

}
