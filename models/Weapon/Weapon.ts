import { PropertyInt, PropertyFloat, DamageTypePhrase, SkillName, WeaponTypeName } from "~/util/mappings";
import { Item } from "../Item";
import type { ItemData } from "../Item";

export interface WeaponData extends ItemData {
  damageString: string,
  speedString: string,
  offenseString: string,
  defenseString: string,
  skillString: string,
  hasWieldRequirement: boolean,
  wieldRequirementString: string,
  spells: string
}

export class Weapon extends Item {
  get ClassName() {
    return "Weapon"
  }

  async load(fetch: any) {
    await super.load(fetch);
  }

  get minDamage(): number {
    return this.maxDamage - (this.maxDamage * this.properties.floats.get(PropertyFloat.DamageVariance))
  }

  get maxDamage(): number {
    return this.properties.ints.get(PropertyInt.Damage)
  }

  get damageString(): string {
    return `${this.minDamage} - ${this.maxDamage}, ${DamageTypePhrase(this.properties.ints.get(PropertyInt.DamageType))}`
  }

  get speedString(): string {
    return this.properties.ints.get(PropertyInt.WeaponTime)
  }

  get defenseString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.WeaponDefense);
    const value = (Math.round((rawValue - 1) * 1000) / 10).toLocaleString(undefined, { minimumFractionDigits: 1 });

    return `${value}%`;
  }

  get offenseString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.WeaponOffense);
    const value = Math.round((rawValue - 1) * 1000) / 10;

    return `${value}%`;
  }

  get skillString(): string {
    const name = SkillName[this.properties.ints.get(PropertyInt.WeaponSkill)];
    const category = WeaponTypeName[this.properties.ints.get(PropertyInt.WeaponType)];

    return `${name} (${category})`;
  }

  get spells(): any {
    return Array.from(this.properties.spell_book?.entries()).map((x) => {
      return {
        id: x[0],
        name: x[1]
      }
    });
  }

  get hasWieldRequirement(): boolean {
    return typeof this.properties.ints.get(PropertyInt.WieldDifficulty) !== "undefined"
  }

  get wieldRequirementString(): string {
    const name = SkillName[this.properties.ints.get(PropertyInt.WieldSkillType)]
    const req = this.properties.ints.get(PropertyInt.WieldDifficulty)

    return `Your base ${name} must be at least ${req} to wield this item.`
  }

  json(): WeaponData {
    return {
      ...super.json(),
      damageString: this.damageString,
      speedString: this.speedString,
      offenseString: this.offenseString,
      defenseString: this.defenseString,
      skillString: this.skillString,
      hasWieldRequirement: this.hasWieldRequirement,
      wieldRequirementString: this.wieldRequirementString,
      spells: this.spells
    }
  }
}
