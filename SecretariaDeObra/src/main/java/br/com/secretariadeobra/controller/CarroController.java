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

import br.com.secretariadeobra.dao.CarroDAO;
import br.com.secretariadeobra.model.Carro;

@Path("carro")
public class CarroController {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public List<Carro> listCarro() {
		try {
			CarroDAO carroDAO = new CarroDAO();
			return carroDAO.listar();

		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(CarroController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/listAll/")
	public List<Carro> listAll() {
		try {
			CarroDAO carroDAO = new CarroDAO();
			return carroDAO.listarAll();

		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(CarroController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response save(Carro carro) {
		try {
			CarroDAO carroDAO = new CarroDAO();
			carroDAO.save(carro);
			return Response.status(Response.Status.OK).build();
		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(CarroController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23505")) {
				System.out.println("ATENÇÃO! já existe " + carro.getNome() + " entre com um dado diferente!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response update(Carro carro) {
		try {
			CarroDAO carroDAO = new CarroDAO();
			carroDAO.update(carro);
			return Response.status(Response.Status.OK).build();
		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@DELETE
	@Path("{id}/")
	public Response delete(@PathParam("id") long id) {
		try {
			CarroDAO carroDAO = new CarroDAO();
			carroDAO.excluir(id);
			return Response.status(Response.Status.OK).build();
		} catch (SQLException | ClassNotFoundException ex) {
			Logger.getLogger(CarroController.class.getName()).log(Level.SEVERE, null, ex);
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
