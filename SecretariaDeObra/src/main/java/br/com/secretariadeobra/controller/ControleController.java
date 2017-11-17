package br.com.secretariadeobra.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.secretariadeobra.dao.ControleDAO;
import br.com.secretariadeobra.model.Controle;

@Path("controle")
public class ControleController {

	// public Connection conn;
	// public JasperPrint relatorio;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public List<Controle> listControle() {
		try {
			ControleDAO controleDAO = new ControleDAO();
			return controleDAO.listar();

		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(ControleController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	// @GET
	// @Produces(MediaType.APPLICATION_JSON)
	// @Path("/imprimir")
	// public List<Controle> imprimir() throws ParseException, JRException {
	// SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy");
	// java.util.Date dateIni = null;
	// java.util.Date dateFim = null;
	// String dateINICIAL = "10/06/2017";
	// String dateFINAL = "10/07/2017";
	// String razaoEmp = "LX TXT TESTE LTDA";
	// String enderEmp = "RUA TESTE 75";
	// dateIni = f.parse(dateINICIAL);
	// dateFim = f.parse(dateFINAL);
	//
	// String fsep = System.getProperty("file.separator");
	// String report_dir = System.getProperty("user.dir") + fsep
	// + "C:\\Users\\Jhow\\workspaceMars\\Holder\\src\\main\\webapp\\relatorios"
	// + fsep;
	// String arquivo = report_dir + "controle.jasper";
	// // String caminho = "C:/nfe/NFeFacil/Relatorios/areceber.jasper";
	//
	// HashMap parameterMap = new HashMap();
	//
	// relatorio = JasperFillManager.fillReport(arquivo, parameterMap, conn);
	// JasperViewer.viewReport(relatorio);

	// return null;
	// }

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response save(Controle controle) {
		try {
			ControleDAO controleDAO = new ControleDAO();
			if (controle.getId() == null) {
				controle.setStatus("PENDENTE");
			}
			controleDAO.save(controle);
			return Response.status(Response.Status.OK).build();
		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(ControleController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23505")) {
				System.out.println(
						"ATENÇÃO! já existe " + controle.getFuncionario().getNome() + " entre com um dado diferente!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response update(Controle controle) {
		try {
			ControleDAO controleDAO = new ControleDAO();
			
			if (controle.getDataDevolucao() == null) {
				throw new WebApplicationException(Response.Status.EXPECTATION_FAILED);
			}else{
				controleDAO.update(controle);
				return Response.status(Response.Status.OK).build();
			}
		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@DELETE
	@Path("{id}/")
	public Response delete(@PathParam("id") long id) {
		try {
			ControleDAO controleDAO = new ControleDAO();
			controleDAO.excluir(id);
			return Response.status(Response.Status.OK).build();
		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(ControleController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23503")) {
				System.out.println(
						"ATENÇÃO! Não é Possivel deletar " + id + " pois está sendo usado(a) em outro Registro!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

}
