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

import br.com.secretariadeobra.dao.EnderecoDAO;
import br.com.secretariadeobra.dao.MunicipioDAO;
import br.com.secretariadeobra.model.Endereco;
import br.com.secretariadeobra.model.Municipio;
import br.com.secretariadeobra.model.Pais;
import br.com.secretariadeobra.model.Uf;

@Path("municipio")
public class MunicipioController {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public List<Municipio> listMunicipio() {
		try {
			MunicipioDAO municipioDAO = new MunicipioDAO();
			return municipioDAO.listar();

		} catch (Exception ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response save(Municipio municipio) {
		try {
			MunicipioDAO municipioDAO = new MunicipioDAO();
			municipioDAO.save(municipio);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23505")) {
				System.out.println("ATENÇÃO! já existe " + municipio.getNome() + " entre com um dado diferente!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/")
	public Response update(Municipio municipio) {
		try {
			MunicipioDAO municipioDAO = new MunicipioDAO();
			municipioDAO.update(municipio);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{idPais}/{id}/")
	public Response updateNegocianteMunicipio(List<Endereco> enderecos, @PathParam("idPais") long idPais,
			@PathParam("id") long id) {
		try {
			EnderecoDAO enderecoDAO = new EnderecoDAO();

			MunicipioDAO municipioDAO = new MunicipioDAO();
			Pais pais = new Pais();

			Uf uf = new Uf();

			Municipio municipio = new Municipio();

			for (Endereco endereco : enderecos) {
				if (endereco.getId() == null) {
					enderecoDAO.save(endereco);
				} else {
					uf.setId(endereco.getMunicipio().getUf().getId());
					pais.setId(endereco.getMunicipio().getPais().getId());
					municipio.setId(endereco.getMunicipio().getId());
					municipio.setNome(endereco.getMunicipio().getNome());
					municipio.setPais(pais);
					municipio.setUf(uf);
					municipioDAO.update(municipio);
				}
			}
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	@DELETE
	@Path("{id}/")
	public Response delete(@PathParam("id") long id) {
		try {
			MunicipioDAO municipioDAO = new MunicipioDAO();
			municipioDAO.excluir(id);
			return Response.status(Response.Status.OK).build();
		} catch (Exception ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			if (((SQLException) ex).getSQLState().equals("23503")) {
				System.out.println(
						"ATENÇÃO! Não é Possivel deletar " + id + " pois está sendo usado(a) em outro Registro!");
				throw new WebApplicationException(Response.Status.UNAUTHORIZED);
			} else {
				throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@GET
	@Path("{nome}/")
	public List<Municipio> filterByAllMunicipio(@PathParam("nome") String nome) {
		try {
			MunicipioDAO municipioDAO = new MunicipioDAO();
			return municipioDAO.filterByAllMunicipio(nome);
		} catch (Exception ex) {
			Logger.getLogger(MunicipioController.class.getName()).log(Level.SEVERE, null, ex);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

}
