using AutoMapper;
using Server.Dtos;

namespace Server;

public class CardEntityMappingProfile : Profile
{
    private bool ConvertLegalityToBool(string legality) =>
        legality == "legal";
    
    public CardEntityMappingProfile() {
        CreateMap<LegalitiesDto, Legalities>()
            .ForMember(
                dest => dest.Commander,
                opt => 
                    opt.MapFrom(src => ConvertLegalityToBool(src.Commander))
            )
            .ForMember(
                dest => dest.Brawl,
                opt => opt.MapFrom(src => ConvertLegalityToBool(src.Brawl))
            )
            .ForMember(
                dest => dest.Legacy,
                opt => opt.MapFrom(src => ConvertLegalityToBool(src.Legacy))
            )
            .ForMember(
                dest => dest.Pioneer,
                opt => opt.MapFrom(src => ConvertLegalityToBool(src.Pioneer))
            )
            .ForMember(
                dest => dest.Standard,
                opt => opt.MapFrom(src => ConvertLegalityToBool(src.Standard))
            )
            .ForMember(
                dest => dest.Vintage,
                opt => opt.MapFrom(src => ConvertLegalityToBool(src.Vintage))
            )
            .ForMember(
                dest => dest.Modern,
                opt => opt.MapFrom(src => ConvertLegalityToBool(src.Modern))
            );
        CreateMap<CardDto, CardVersion>()
            .ForMember(
                dest => dest.IsFoil,
                opt => opt.MapFrom(src => src.Foil)
            )
            .ForMember(
                dest => dest.CardImage,
                opt => opt.MapFrom(src => src.ImageUrisDto.CardImage)
            )
            .ForMember(
                dest => dest.ArtCrop,
                opt => opt.MapFrom(src => src.ImageUrisDto.ArtCrop)
            )
            .ForMember(
                dest => dest.IsReprint, 
                opt => opt.MapFrom(src=> src.Reprint)
            )
            .ForMember(
                dest => dest.IsPromo, 
                opt => opt.MapFrom(src=> src.Promo)
            )
            .ForMember(
                dest => dest.IsVariation, 
                opt => opt.MapFrom(src=> src.Variation));
        CreateMap<IEnumerable<CardDto>, Card>()
            .ForMember(
                dest => dest.CardVersions,
                opt => opt.MapFrom(src => src)
            )
            .ForMember(
                dest => dest.Name,
                opt => opt.MapFrom(src => src.First().Name)
            )
            .ForMember(
                dest => dest.OracleId,
                opt => opt.MapFrom(src => src.First().OracleId)
            )
            .ForMember(
                dest => dest.Keywords,
                opt => opt.MapFrom(src => src.First().Keywords)
            )
            .ForMember(
                dest => dest.Lang,
                opt => opt.MapFrom(src => src.First().Lang)
            )
            .ForMember(
                dest => dest.Layout,
                opt => opt.MapFrom(src => src.First().Layout)
            )
            .ForMember(
                dest => dest.ColorIdentity,
                opt => opt.MapFrom(src => src.First().ColorIdentity)
            )
            .ForMember(
                dest => dest.ColorIndicator,
                opt => opt.MapFrom(src => src.First().ColorIndicator)
            )
            .ForMember(
                dest => dest.Colors,
                opt => opt.MapFrom(src => src.First().Colors)
            )
            .ForMember(
                dest => dest.Power,
                opt => opt.MapFrom(src => src.First().Power)
            )
            .ForMember(
                dest => dest.Toughness,
                opt => opt.MapFrom(src => src.First().Toughness)
             )
            .ForMember(
                dest => dest.Legalities,
                opt => opt.MapFrom(src => src.First().LegalitiesDto)
            )
            .ForMember(
                dest => dest.AllParts,
                opt => opt.MapFrom(src => src.First().AllParts)
        );
    }
}