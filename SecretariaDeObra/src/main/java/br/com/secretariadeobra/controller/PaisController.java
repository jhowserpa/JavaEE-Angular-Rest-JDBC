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

import br.com.secretariadeobra.dao.PaisDAO;
import br.com.secretariadeobra.model.Pais;

@Path("pais")
public class PaisController {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public List<Pais> listPais() {
		try {
			PaisDAO paisDAO = new PaisDAO();
			return paisDAO.listar();

		} catch (Exception ex) {
			Logger.getLogger(PaisController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response save(Pais pais) {
		try {
			PaisDAO paisDAO = new PaisDAO();
			paisDAO.save(pais);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(PaisController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23505")) {
				System.out.println("ATENÇÃO! já existe " + pais.getDescricao() + " entre com um dado diferente!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response update(List<Pais> paises) {
		try {
			PaisDAO paisDAO = new PaisDAO();

			for (Pais pais : paises) {
				if (pais.getId() == null) {
					paisDAO.save(pais);
				} else {
					paisDAO.update(pais);
				}
			}
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(PaisController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@DELETE
	@Path("{id}/")
	public Response delete(@PathParam("id") long id) {
		try {
			PaisDAO paisDAO = new PaisDAO();
			paisDAO.excluir(id);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(PaisController.class.getName()).log(Level.SEVERE, null, ex);
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
