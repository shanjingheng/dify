from core.external_data_tool.base import ExternalDataTool


class ApiBasedExternalDataTool(ExternalDataTool):
    type = "api_based"

    @classmethod
    def validate_config(self, config: dict) -> None:
        api_based_extension_id = config.get("api_based_extension_id")
        if not api_based_extension_id:
            raise ValueError("api_based_extension_id is required")
        
        # todo