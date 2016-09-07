package <%=data.packageName%>.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Entity
public class <%=data.moduleName%> implements Serializable {
	private static final long serialVersionUID = 1L;

    <%
    var  columns = [];
    for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = field;
           var displayName = fieldDef.dName;
           var type        = fieldDef.type;
           if ((field =='id')||(field=='_id')){%>
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private <%=type%> <%=keyName%>;
          <% }else{

     %>
     //<%-displayName%>
     private <%=type%> <%=keyName%>;
      <%}}%>
     public <%=data.moduleName%>() {
	 }
     <%
       for (var field in data.moduleDefine){
           var fieldDef = data.moduleDefine[field];
           var keyName     = data.firstUpper(field);
           var displayName = fieldDef.dName;
           var type        = fieldDef.type;
     %>
     //<%-displayName%>
     public <%=type%> get<%=keyName%>(){
         return this.<%=keyName%>;
     };
     public void set<%=keyName%>(<%=type%> input){
         this.this.<%=keyName%> = input;
     }
     <%}%>



	@Override
	public String toString() {
		return "CLASS DATA: [id=" + id + ", name=" + name + "]";
	}
}
