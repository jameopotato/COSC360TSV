<%@ Page Language="C#" %>

<%
   DBDataContext DB = new DBDataContext();
   var Instr = DB.InstructorSubjects.Select(I => "{" + I.UBCId + ",'" + I.Name + "','" + I.Subject + "'}");

   Response.Write(string.Join(",", Instr));
%>