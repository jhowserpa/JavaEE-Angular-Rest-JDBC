package br.com.secretariadeobra.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.secretariadeobra.dao.EnderecoDAO;
import br.com.secretariadeobra.model.Endereco;
import br.com.secretariadeobra.model.Municipio;

@Path("endereco")
public class EnderecoController {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response save(Endereco endereco) {
		try {
			EnderecoDAO enderecoDAO = new EnderecoDAO();
			enderecoDAO.save(endereco);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(EnderecoController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23505")) {
				System.out.println("ATENÇÃO! já existe " + endereco.getEndereco() + " entre com um dado diferente!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response update(List<Endereco> enderecos) {
		try {
			EnderecoDAO enderecoDAO = new EnderecoDAO();

			Municipio municipio = new Municipio();

			for (Endereco endereco : enderecos) {
				if (endereco.getId() == null) {
					enderecoDAO.save(endereco);
				} else {
					municipio.setId(endereco.getMunicipio().getId());
					endereco.setMunicipio(municipio);
					enderecoDAO.update(endereco);
				}
			}

			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(EnderecoController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@DELETE
	@Path("{id}/")
	public Response delete(@PathParam("id") long id) {
		try {
			EnderecoDAO enderecoDAO = new EnderecoDAO();
			enderecoDAO.excluir(id);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(EnderecoController.class.getName()).log(Level.SEVERE, null, ex);
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
