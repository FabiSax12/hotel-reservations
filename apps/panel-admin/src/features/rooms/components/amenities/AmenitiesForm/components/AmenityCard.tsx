import React from "react";
import * as LucideIcons from "lucide-react";
import { Amenity } from "@/features/rooms/domain/amenity.interface";
import { IconRenderer } from "./IconRenderer";
import { AMENITIES_FORM_STYLES as s } from "../AmenitiesForm.styles";

interface AmenityCardProps {
  amenity: Amenity;
  isSelected: boolean;
  isFlipped: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onFlipToggle: () => void;
  texts: any;
}

export const AmenityCard: React.FC<AmenityCardProps> = ({
  amenity,
  isSelected,
  isFlipped,
  onToggle,
  onEdit,
  onDelete,
  onFlipToggle,
  texts,
}) => {
  return (
    <div className={s.flipWrapper}>
      <div className={s.flipInner(isFlipped)}>
        
        {/* Front Side of Card */}
        <div
          className={s.flipFront(isSelected)}
          onClick={onToggle}
        >
          {isSelected && <LucideIcons.CheckCircle2 className={s.checkIcon} size={20} />}

          {/* Universal Edit and Delete Actions */}
          <div className={s.customCardActions} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={s.customCardActionBtn("edit")}
              onClick={onEdit}
              title="Editar"
            >
              <LucideIcons.Pencil size={12} />
            </button>
            <button
              type="button"
              className={s.customCardActionBtn("delete")}
              onClick={onDelete}
              title="Eliminar"
            >
              <LucideIcons.Trash2 size={12} />
            </button>
          </div>

          {/* Info switch trigger button */}
          {amenity.description && (
            <button
              type="button"
              className={s.infoTriggerBtn(isSelected)}
              onClick={(e) => {
                e.stopPropagation();
                onFlipToggle();
              }}
              title="Ver descripción"
            >
              <LucideIcons.Info size={14} />
            </button>
          )}

          <div className={s.iconWrapper(isSelected)}>
            <IconRenderer name={amenity.icon || "HelpCircle"} />
          </div>
          <span className={s.amenityName(isSelected)}>{amenity.name}</span>
        </div>

        {/* Back Side of Card */}
        {amenity.description && (
          <div
            className={s.flipBack(isSelected)}
            onClick={onToggle}
          >
            {/* Info switch close trigger */}
            <button
              type="button"
              className={s.infoTriggerBtn(isSelected)}
              onClick={(e) => {
                e.stopPropagation();
                onFlipToggle();
              }}
              title="Ver menos"
            >
              <LucideIcons.Info size={14} />
            </button>

            {isSelected && <LucideIcons.CheckCircle2 className={s.checkIcon} size={20} />}

            <p className={s.descText}>{amenity.description}</p>
          </div>
        )}

      </div>
    </div>
  );
};
